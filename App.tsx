import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI, Type } from '@google/genai';

import { Observation, Coordinates, WeatherData } from './types';
import { Language, translations } from './translations';

import Header from './components/Header';
import HomePage from './components/HomePage';
import CameraCapture from './components/CameraCapture';
import ObservationDetails from './components/ObservationDetails';
import SkeletonCard from './components/SkeletonCard';
import { SpinnerIcon } from './components/icons';

// Fix: Correctly initialize GoogleGenAI with a named apiKey parameter.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Helper to convert data URI to a blob-like object for the API
const dataUriToBlob = (dataUri: string) => {
    const [header, base64Data] = dataUri.split(',');
    const mimeType = header.match(/:(.*?);/)?.[1];
    return {
        inlineData: {
            data: base64Data,
            mimeType: mimeType || 'image/jpeg',
        },
    };
};

const App: React.FC = () => {
    type View = 'home' | 'capturing' | 'details' | 'processing';
    const [view, setView] = useState<View>('home');
    const [observations, setObservations] = useState<Observation[]>([]);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [processingError, setProcessingError] = useState<string | null>(null);
    const [language, setLanguage] = useState<Language>('en');

    // Load initial state from localStorage
    useEffect(() => {
        try {
            const storedObservations = localStorage.getItem('observations');
            if (storedObservations) {
                const parsed = JSON.parse(storedObservations).map((obs: any) => ({
                    ...obs,
                    timestamp: new Date(obs.timestamp), // Revive Date object
                }));
                setObservations(parsed);
            }
            const storedLanguage = localStorage.getItem('language');
            if (storedLanguage && ['en', 'or', 'bn', 'te'].includes(storedLanguage)) {
                setLanguage(storedLanguage as Language);
            }
        } catch (error) {
            console.error("Failed to load from localStorage", error);
        }
    }, []);
    
    // Save state to localStorage
    useEffect(() => {
        try {
            localStorage.setItem('observations', JSON.stringify(observations));
        } catch (error) {
            console.error("Failed to save observations to localStorage", error);
        }
    }, [observations]);

    useEffect(() => {
        try {
            localStorage.setItem('language', language);
        } catch (error) {
            console.error("Failed to save language to localStorage", error);
        }
    }, [language]);

    const t = useCallback((key: keyof typeof translations.en) => {
        return translations[language][key] || translations.en[key];
    }, [language]);


    const handleCapture = (imageData: string) => {
        setCapturedImage(imageData);
        setView('details');
    };

    const resetState = () => {
        setCapturedImage(null);
        setProcessingError(null);
        setView('home');
    };
    
    const handleSaveObservation = async (details: { name?: string }) => {
        if (!capturedImage) return;
        setView('processing');
        setProcessingError(null);

        try {
            const location: Coordinates | null = await new Promise((resolve) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }),
                    (error) => {
                        console.error("Geolocation error:", error);
                        resolve(null); // Resolve with null on error
                    },
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
                );
            });

            // Call Gemini API
            const imagePart = dataUriToBlob(capturedImage);
            
            const textPrompt = `Analyze the attached image of a coastal scene. Identify the main subject or describe the scene. Based on the provided location (${location?.latitude}, ${location?.longitude}), also provide the current weather conditions. Please respond in JSON format.`;

            // Fix: Use the correct model name and API structure as per guidelines.
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [imagePart, { text: textPrompt }] },
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            name: {
                                type: Type.STRING,
                                description: "A short, descriptive name for the object or scene in the image (e.g., 'Seagull on a post', 'Rocky shoreline at sunset')."
                            },
                            weather: {
                                type: Type.OBJECT,
                                properties: {
                                    temperature: { type: Type.NUMBER, description: "Temperature in Celsius." },
                                    humidity: { type: Type.NUMBER, description: "Humidity in percentage." },
                                    weatherCode: { type: Type.NUMBER, description: "WMO Weather interpretation code." },
                                    windSpeed: { type: Type.NUMBER, description: "Wind speed in km/h." },
                                    description: { type: Type.STRING, description: "A brief description of the weather (e.g., 'Clear sky', 'Partly cloudy')." }
                                },
                                required: ['temperature', 'humidity', 'weatherCode', 'windSpeed', 'description']
                            }
                        },
                        required: ['name', 'weather']
                    },
                },
            });
            
            // Fix: Correctly extract text from the response and parse it as JSON.
            const jsonText = response.text.trim();
            const result = JSON.parse(jsonText);
            const geminiData = result as { name: string; weather: WeatherData };

            const newObservation: Observation = {
                id: new Date().toISOString(),
                image: capturedImage,
                timestamp: new Date(),
                location: location,
                locationError: !location ? "Could not retrieve location." : undefined,
                name: details.name || geminiData.name, // Prefer user's name if provided
                weather: geminiData.weather,
            };

            setObservations(prev => [newObservation, ...prev]);
            resetState();

        } catch (error) {
            console.error("Error processing observation:", error);
            setProcessingError("Failed to analyze the image. Please try again.");
            // Don't reset state fully, allow user to retry or cancel from details
            setView('details');
        }
    };
    
    const renderContent = () => {
        switch (view) {
            case 'capturing':
                return <CameraCapture onCapture={handleCapture} onCancel={resetState} />;
            case 'details':
                return <ObservationDetails 
                    imageData={capturedImage!} 
                    onSave={handleSaveObservation} 
                    onCancel={resetState}
                    t={t}
                />;
            case 'processing':
                return (
                    <div className="flex flex-col items-center justify-center flex-grow p-4 text-center">
                        <SkeletonCard />
                        <div className="mt-[-8rem] relative z-10 flex items-center bg-white dark:bg-slate-800 p-4 rounded-full shadow-lg">
                           <SpinnerIcon className="w-8 h-8 mr-4 text-sky-500" />
                           <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">{t('processingObservation')}</p>
                        </div>
                    </div>
                );
            case 'home':
            default:
                return <HomePage observations={observations} onNewObservation={() => setView('capturing')} t={t} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans">
            <Header language={language} setLanguage={setLanguage} t={t}/>
            <main className="flex flex-col items-center">
                {renderContent()}
                {processingError && view === 'details' && (
                     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg z-20" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{processingError}</span>
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;
