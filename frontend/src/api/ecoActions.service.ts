import api from './api';

export const createEcoAction = async (data: {
  type: string;
  points: number;
}) => {
  const response = await api.post('/eco-actions', data);
  return response.data;
};

export const getEcoActions = async () => {
  const response = await api.get('/eco-actions');
  return response.data;
};