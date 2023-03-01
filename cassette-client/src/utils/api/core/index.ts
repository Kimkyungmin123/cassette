import axios, { AxiosError } from 'axios';
import {
  getAuthToken,
  removeAuthToken,
  setAuthToken,
} from 'utils/storage/authCookie';

import mainInstance from '../main';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

instance.defaults.timeout = 3000;

instance.interceptors.request.use(
  async (config) => {
    config.withCredentials = true;
    try {
      const token = await getAuthToken('accessToken');

      if (config.headers) {
        config.headers['Authorization'] = token && `Bearer ${token}`;
        config.headers['env'] = `${process.env.NEXT_PUBLIC_HEADERS_ENV}`;
      }
    } catch (e: any) {
      window.location.href = '/';
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    const refreshTokenString = response.headers.refreshtoken;

    if (refreshTokenString) {
      const token = refreshTokenString.substring(
        refreshTokenString.indexOf('=') + 1,
        refreshTokenString.indexOf(';'),
      );

      setAuthToken('refreshToken', token);
    }
    const res = response.data;
    return res;
  },
  async (error: AxiosError) => {
    try {
      const code = error.code;
      const status = error.response?.status;
      const refreshToken = await getAuthToken('refreshToken');

      if (status === 401 || code === 'EXPIRED_JWT_TOKEN') {
        return new Promise((resolve, reject) => {
          mainInstance
            .getNewToken(refreshToken)
            .then(({ data }) => {
              if (data.result.accessToken) {
                setAuthToken('accessToken', data.data.result.accessToken);

                if (error.config) {
                  error.config.headers[
                    'Authorization'
                  ] = `Bearer ${data.result.accessToken}`;
                  resolve(instance(error.config));
                }
              }
            })
            .catch((e: any) => {
              removeAuthToken('accessToken');
              removeAuthToken('refreshToken');
              window.location.href = '/';
              reject(error);
            });
        });
      }
    } catch (e: any) {
      return Promise.reject(error);
    }
  },
);

export default instance;
