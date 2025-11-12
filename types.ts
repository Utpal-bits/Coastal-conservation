export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  weatherCode: number;
  windSpeed: number;
  description: string;
}

export interface Observation {
  id: string;
  image: string;
  location: Coordinates | null;
  timestamp: Date;
  locationError?: string;
  name?: string;
  weather?: WeatherData;
}
