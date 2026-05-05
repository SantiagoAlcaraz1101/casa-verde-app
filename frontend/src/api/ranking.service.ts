import api from './api';

export const getRanking = async () => {
  const response = await api.get('/ranking');
  return response.data;
};
