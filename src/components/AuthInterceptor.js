import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      console.log('Unauthorized access - redirect to login');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;