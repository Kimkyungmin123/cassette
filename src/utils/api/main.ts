import { Login } from 'types/serverResponse';

import instance from './core';

const fetcher = (url: string) =>
  instance.get(url).then((response) => response.data);

const KakaoSocialLogin = (code: string | string[]) => {
  return instance<Login, Login>(`/callback`, {
    params: { code: `${code}` },
  });
};

const getUserInfo = () => instance({ url: `/api/v1/member` });

const deleteUser = () => {
  return instance({
    method: 'delete',
    url: `/api/v1/member/withdrawal`,
  });
};

const mainInstance = {
  fetcher,
  KakaoSocialLogin,
  getUserInfo,
  deleteUser,
};

export default mainInstance;
