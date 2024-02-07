import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from 'src/config-global';

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

export const endpoints = {
  category: 'categories',
  brand: {
    list: '/rest/v1/api/brand/list',
  },
  product: {
    list: '/rest/v1/product/list',
    details: '/rest/v1/product/details',
    search: '/rest/v1/product/search',
  },
};
