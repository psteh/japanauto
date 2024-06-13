import axios from 'axios';
import AxiosClient from '@/app/utils/AxiosClient';

export const login = async (apiUrl: string) => {
  return await axios.post(`${apiUrl}/auth/token`, {
    email: process.env.NEXT_PUBLIC_VISITOR_EMAIL || '',
    password: process.env.NEXT_PUBLIC_VISITOR_PASSWORD || '',
  });
};

export const getAllBrands = async () => {
  return await AxiosClient.get('/auctions/brands');
};

export const getModelsByBrandName = async (brandName: string = '') => {
  return await AxiosClient.get(`/auctions/${brandName}/models`);
};

export const getBrandLotsByModel = async (
  brandName: string = '',
  modelName: string = '',
  numberOfLots: number = 250,
) => {
  return await AxiosClient.get(
    `/auctions/${brandName}/lots?modelNames=${modelName}&numberOfLots=${numberOfLots}`,
  );
};

export const getProviderPhotos = async (providerId: string = '') => {
  return await AxiosClient.get(`/auctions/lots/${providerId}/photos`);
};

export const getLotDataByProviderId = async (providerId: string = '') => {
  return await AxiosClient.get(`/auctions/lots/${providerId}`);
};
