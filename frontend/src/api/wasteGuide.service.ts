import api from './api';

export const getWasteGuide = async () => {
  const response = await api.get('/waste-guide');
  return response.data;
};

export const createWasteItem = async (data: {
  name: string;
  category: string;
  description: string;
}) => {
  const response = await api.post('/waste-guide', data);
  return response.data;
};