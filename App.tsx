import React, { useState, useCallback } from 'react';
import { Observation, Coordinates, WeatherData } from './types';
import { translations, Language, AppStrings } from './translations';

import Header from './components/Header';
import CameraCapture from './components/CameraCapture';
import HomePage from './components/HomePage';
import ObservationDetails from './components/ObservationDetails';

type AppView = 'home' | 'capture' | 'details';

// WMO Weather code descriptions - Simplified
const weatherCodeMap: { [key: number]: string } = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
};

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [observations, setObservations] = useState<Observation[]>([]);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback((key: keyof AppStrings) => {
    return translations[language][key] || translations.en[key];
  }, [language]);

  const fetchWeather = async (coords: Coordinates): Promise<WeatherData | undefined> => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Weather API request failed');
      const data = await response.json();
      const weather: WeatherData = {
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        weatherCode: data.current.weather_code,
        windSpeed: data.current.wind_speed_10m,
        description: weatherCodeMap[data.current.weather_code] || 'Unknown conditions'
      };
      return weather;
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
      return undefined;
    }
  };

  const handleCapture = (imageData: string) => {
    setPendingImage(imageData);
    setView('details');
  };

  const handleSaveObservation = (details: { name?: string }) => {
    if (!pendingImage) return;

    setIsProcessing(true);
    setView('home'); // Go to home to show processing indicator

    const capturedImage = pendingImage;
    setPendingImage(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        const weather = await fetchWeather(coords);
        
        const newObservation: Observation = {
          id: new Date().toISOString(),
          image: capturedImage,
          location: coords,
          timestamp: new Date(),
          name: details.name,
          weather: weather,
        };
        setObservations(prev => [newObservation, ...prev]);
        setIsProcessing(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        const newObservation: Observation = {
          id: new Date().toISOString(),
          image: capturedImage,
          location: null,
          locationError: `Geolocation failed: ${error.message}`,
          timestamp: new Date(),
          name: details.name,
        };
        setObservations(prev => [newObservation, ...prev]);
        setIsProcessing(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const renderView = () => {
    switch(view) {
      case 'capture':
        return <CameraCapture onCapture={handleCapture} onCancel={() => setView('home')} />;
      case 'details':
        if (!pendingImage) {
          setView('home'); // Should not happen, but as a fallback
          return null;
        }
        return (
            <ObservationDetails 
                imageData={pendingImage}
                onSave={handleSaveObservation}
                onCancel={() => { setPendingImage(null); setView('home'); }}
                t={t}
            />
        );
      case 'home':
      default:
        return (
            <HomePage
                observations={observations}
                isProcessing={isProcessing}
                onStartObservation={() => setView('capture')}
                t={t}
            />
        );
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 flex flex-col items-center">
      <Header language={language} setLanguage={setLanguage} t={t} />
      {renderView()}
    </div>
  );
};

export default App;
