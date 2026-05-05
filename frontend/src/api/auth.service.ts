import api from './api';

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const login = async (data: {
  email: string;
  password: string;
}) => {
  const response = await api.post('/auth/login', data);

  // Guardar token
  localStorage.setItem('token', response.data.accessToken);

  return response.data;
};
