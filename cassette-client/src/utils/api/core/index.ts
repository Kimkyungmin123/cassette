import axios from 'axios';
import { getAuthToken, setAuthToken } from 'utils/storage/authCookie';

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

      if (!token) {
        throw new Error('AccessToken 가져오기 실패');
      }

      if (config.headers) {
        config.headers['Authorization'] = token && `Bearer ${token}`;
        config.headers['env'] = `${process.env.NEXT_PUBLIC_HEADERS_ENV}`;
      }
    } catch (e: any) {
      console.error('Authorization or env 삽입 실패');
    }

    return config;
  },

  (error) => {
    console.log(error);

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
  (error) => {
    const code = error.code;
    const status = error.response?.status;

    const refreshToken = getAuthToken('refreshToken');
    if ((status === 401 || code === 'EMPTY_TOKEN') && refreshToken) {
      mainInstance.getNewToken(refreshToken).then(({ data }) => {
        if (data.result.accessToken) {
          setAuthToken('accessToken', data.data.result.accessToken);
        }
      });
    }
  },
);

export default instance;
