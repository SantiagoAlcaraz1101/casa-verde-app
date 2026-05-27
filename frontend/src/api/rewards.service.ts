import api from './api';

export const getRewards = async () => {
  const response = await api.get('/rewards');
  return response.data;
};

export const getAvailableRewards = async () => {
  const response = await api.get('/rewards/available');
  return response.data;
};

export const createReward = async (data: {
  name: string;
  description: string;
  pointsCost: number;
  stock: number;
}) => {
  const response = await api.post('/rewards', data);
  return response.data;
};

export const updateReward = async (
  rewardId: string,
  data: {
    pointsCost?: number;
    stock?: number;
  },
) => {
  const response = await api.patch(
    `/rewards/${rewardId}`,
    data,
  );

  return response.data;
};

export const deleteReward = async (
  rewardId: string,
) => {
  const response = await api.delete(
    `/rewards/${rewardId}`,
  );

  return response.data;
};

export const redeemReward = async (
  rewardId: string,
) => {
  const response = await api.post(
    `/rewards/${rewardId}/redeem`,
  );

  return response.data;
};

export const getMyRedemptions = async () => {
  const response = await api.get(
    '/rewards/my-redemptions',
  );

  return response.data;
};