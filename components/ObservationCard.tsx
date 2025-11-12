import React from 'react';
import { Observation, WeatherData } from '../types';
import { LocationMarkerIcon, ThermometerIcon, DropletIcon, WindIcon, SunIcon, CloudIcon } from './icons';

interface ObservationCardProps {
  observation: Observation;
}

const WeatherIcon: React.FC<{ weather: WeatherData }> = ({ weather }) => {
    // Simple mapping from WMO weather code to icon
    if (weather.weatherCode <= 1) return <SunIcon className="w-6 h-6 text-yellow-500" />;
    if (weather.weatherCode <= 3) return <CloudIcon className="w-6 h-6 text-slate-500" />;
    return <CloudIcon className="w-6 h-6 text-slate-500" />;
};


const ObservationCard: React.FC<ObservationCardProps> = ({ observation }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden my-4 w-full max-w-md mx-auto transition-all duration-300 hover:shadow-xl">
      <img src={observation.image} alt={observation.name || "Observation"} className="w-full h-64 object-cover" />
      <div className="p-6">
        {observation.name && <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{observation.name}</h2>}
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          {observation.timestamp.toLocaleString()}
        </p>
        
        {observation.weather && (
          <div className="mb-4 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
             <div className="flex items-center mb-2">
                <WeatherIcon weather={observation.weather} />
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 ml-3 text-lg">{observation.weather.description}</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                    <ThermometerIcon className="w-5 h-5 text-red-500 mb-1" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{observation.weather.temperature}°C</span>
                </div>
                <div className="flex flex-col items-center">
                    <DropletIcon className="w-5 h-5 text-sky-500 mb-1" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{observation.weather.humidity}%</span>
                </div>
                <div className="flex flex-col items-center">
                    <WindIcon className="w-5 h-5 text-green-500 mb-1" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{observation.weather.windSpeed} km/h</span>
                </div>
            </div>
          </div>
        )}

        <div className="flex items-start p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
          <LocationMarkerIcon className="w-6 h-6 text-sky-500 mr-4 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Location</h3>
            {observation.location ? (
              <div className="text-sm text-slate-600 dark:text-slate-300 font-mono">
                <p>Lat: {observation.location.latitude.toFixed(6)}</p>
                <p>Lon: {observation.location.longitude.toFixed(6)}</p>
              </div>
            ) : (
              <p className="text-sm text-red-500 dark:text-red-400">
                {observation.locationError || 'Location data not available.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObservationCard;
