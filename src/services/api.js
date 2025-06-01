import api from '../components/AuthInterceptor';

export const login = (credentials) => {
  return api.post('/auth/login', credentials);
};

