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
      const accessToken = await getAuthToken('accessToken');

      if (!accessToken) Promise.reject('accessToken 가져오기 실패');

      if (config.headers) {
        config.headers['Authorization'] =
          accessToken && `Bearer ${accessToken}`;
        config.headers['env'] = `local`;
      }
    } catch {
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
    console.log(error);

    const code = error.code;
    const status = error.response?.status;

    //TODO: 만료시간 계산해서 만료 되기 전에 refresh 토큰 저장
    if (code === 'EXPIRED_JWT_TOKEN' || status === 401) {
      const refreshToken = getAuthToken('refreshToken');
      if (refreshToken)
        mainInstance.getNewToken(refreshToken).then((data) => {
          if (data.data.result.accessToken)
            setAuthToken('accessToken', data.data.result.accessToken);
        });
    }

    return Promise.reject(error);
  },
);

export default instance;
