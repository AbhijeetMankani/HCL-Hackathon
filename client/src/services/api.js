import axios from 'axios';

// Base API URL - change this to your backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('patientId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  register: async (userData) => {
    const response = await apiClient.post('/patients/register', userData);
    // Store token if registration successful
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  login: async (credentials) => {
    const response = await apiClient.post('/patients/login', credentials);
    // Store token if login successful
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('patientId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
  },
};

// Patient API endpoints
export const patientAPI = {
  getUserData: async (userId) => {
    const response = await apiClient.get(`/patients/userdata/${userId}`);
    return response.data;
  },

  updateUserData: async (userId, data) => {
    const response = await apiClient.post(`/patients/userdata/${userId}`, data);
    return response.data;
  },
};

// Wellness Goals API endpoints
export const goalsAPI = {
  getGoals: async (patientId) => {
    const response = await apiClient.get(`/patients/goals/${patientId}`);
    return response.data;
  },

  createGoal: async (patientId, goalData) => {
    const response = await apiClient.post(`/patients/goals/${patientId}`, goalData);
    return response.data;
  },

  updateGoal: async (patientId, goalId, goalData) => {
    const response = await apiClient.put(`/patients/goals/${patientId}/${goalId}`, goalData);
    return response.data;
  },

  updateProgress: async (patientId, goalId, currentValue) => {
    const response = await apiClient.patch(`/patients/goals/${patientId}/${goalId}/progress`, { currentValue });
    return response.data;
  },

  deleteGoal: async (patientId, goalId) => {
    const response = await apiClient.delete(`/patients/goals/${patientId}/${goalId}`);
    return response.data;
  },
};

export default apiClient;
