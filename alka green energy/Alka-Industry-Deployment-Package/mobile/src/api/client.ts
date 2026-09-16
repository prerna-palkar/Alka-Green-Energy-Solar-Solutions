import axios from 'axios';

// Dynamic API base URL configuration for production, physical device over LAN, or emulator
const PRODUCTION_API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:5000/api';
const LOCALHOST_URL = 'http://localhost:5000/api';

// Determine initial base URL (prefers production environment variable if set, otherwise fallback)
const getInitialBaseURL = () => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }
  return PRODUCTION_API_URL;
};

export const apiClient = axios.create({
  baseURL: getInitialBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const setApiBaseUrl = (newUrl: string) => {
  apiClient.defaults.baseURL = newUrl;
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};
