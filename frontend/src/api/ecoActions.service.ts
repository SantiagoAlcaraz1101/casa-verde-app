import api from './api';

export const createEcoAction = async (data: {
  type: string;
  points: number;
}) => {
  const response = await api.post('/eco-actions', data);
  return response.data;
};