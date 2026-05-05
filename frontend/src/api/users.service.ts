import api from './api';

// Obtener todos los usuarios (ADMIN)
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// 🔥 Obtener usuario logueado
export const getProfile = async () => {
  const response = await api.get('/users/me');
  return response.data;
};