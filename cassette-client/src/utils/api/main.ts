import axios from 'axios';
import { WithdrawalType } from 'types';
import { Login } from 'types/serverResponse';

import instance from './core';

const fetcher = (url: string) =>
  instance.get(url).then((response) => response.data);

const kakaoSocialLogin = (code: string) => {
  return instance<Login, Login>(`/callback`, {
    params: { code: `${code}` },
  });
};

const logout = () => instance({ url: 'api/v1/member/logout' });

const getUserInfo = () => instance<Login, Login>({ url: `/api/v1/member` });

const deleteUser = (
  withdrawalType: WithdrawalType,
  withdrawalReason: string,
) => {
  return instance({
    method: 'post',
    url: `/api/v1/member/withdrawal`,
    data: {
      withdrawalType,
      withdrawalReason,
    },
  });
};

const getNewToken = () =>
  axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/auth/refresh`,
    {},
    { withCredentials: true },
  );

const mainInstance = {
  fetcher,
  kakaoSocialLogin,
  logout,
  getUserInfo,
  deleteUser,
  getNewToken,
};

export default mainInstance;
