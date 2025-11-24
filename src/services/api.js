// src/services/api.js
import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 300000, // 5 minutes timeout (300 seconds) for long-running analysis
});

// Upload document for analysis
export const uploadDocument = async (file, query) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('query', query);

  const response = await api.post('/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Check analysis status
export const checkStatus = async (jobId) => {
  const response = await api.get(`/status/${jobId}`);
  return response.data;
};

// Check system health
export const checkHealth = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
