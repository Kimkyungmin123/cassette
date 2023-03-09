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
    window.location.href = '/';
    Promise.reject(error);
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
  async (error: AxiosError<any>) => {
    try {
      const code = error.response?.data?.code;
      const status = error.response?.status;

      if (status === 404 && code === 'INVALID_MEMBER_OR_NOT_FOUND') {
        removeAuthToken('accessToken');
        window.localStorage.removeItem('persist');
        window.location.href = '/';
      }

      if (status === 401 || code === 'EXPIRED_JWT_TOKEN') {
        mainInstance
          .getNewToken()
          .then(({ data }) => {
            if (data.result.accessToken) {
              setAuthToken('accessToken', data.result.accessToken);
              window.location.reload();
            }

            if (error.config) {
              error.config.headers[
                'Authorization'
              ] = `Bearer ${data.result.accessToken}`;
              return instance(error.config);
            }
          })
          .catch((e: any) => {
            removeAuthToken('accessToken');
            window.localStorage.removeItem('persist');
            window.location.href = '/';
          });
      }
    } catch (e: any) {
      window.location.href = '/';

      Promise.reject(error);
    }
  },
);

export default instance;
