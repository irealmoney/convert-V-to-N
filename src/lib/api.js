import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add token here if needed
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const makeLoginOTP = (data) => apiClient.post('/make-login-otp', data);
export const verifyOTP = (data) => apiClient.post('/verify-otp', data);
export const login = (data) => apiClient.post('/login', data);
export const register = (data) => apiClient.post('/register', data);

export default apiClient;