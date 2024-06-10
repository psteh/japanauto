import axios from 'axios';

import { API_URL } from '@/app/constants';

export const getAllBrands = async () => {
  return await axios.get(`${API_URL}/auctions/brands`);
};

export const getModelsByBrandName = async (brandName: string = '') => {
  return await axios.get(`${API_URL}/auctions/${brandName}/models`);
};

export const getBrandLotsByModel = async (
  brandName: string = '',
  modelName: string = '',
  numberOfLots: number = 250,
) => {
  return await axios.get(
    `${API_URL}/auctions/${brandName}/lots?modelNames=${modelName}&numberOfLots=${numberOfLots}`,
  );
};

export const getProviderPhotos = async (providerId: string = '') => {
  return await axios.get(`${API_URL}/auctions/lots/${providerId}/photo`);
};

export const getLotDataByProviderId = async (providerId: string = '') => {
  return await axios.get(`${API_URL}/auctions/lots/${providerId}`);
};
