import api from './api';

export const getEcoActionConfigs = async () => {
  const response = await api.get('/eco-action-config');
  return response.data;
};

export const updateEcoActionPoints = async (
  id: string,
  points: number,
) => {
  const response = await api.patch(
    `/eco-action-config/${id}`,
    {
      points,
    },
  );

  return response.data;
};