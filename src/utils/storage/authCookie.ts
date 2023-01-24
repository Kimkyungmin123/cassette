import { CookieSerializeOptions } from 'cookie';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setAuthToken = (name: string, value: string) => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);

  const options: CookieSerializeOptions = {
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: expireDate,
    path: '/',
  };

  return cookies.set(name, value, options);
};

export const getAuthToken = (name: string) => cookies.get(name);

export const removeAuthToken = (name: string) => cookies.remove(name);
