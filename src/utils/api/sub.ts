import { Color } from 'types';

import instance from './core';

const getUserTape = () => instance({ url: `/api/v1/tape` });

const getGuestTape = (id: number) => instance({ url: `/api/v1/tape${id}` });

const createUserTape = (colorCode: Color, title: string, name: string) => {
  return instance({
    method: 'post',
    url: `/api/v1/member/follow`,
    data: {
      colorCode,
      title,
      name,
    },
  });
};

const modifyUseTape = (
  id: number,
  colorCode: Color,
  title: string,
  name: string,
) => {
  return instance({
    method: 'put',
    url: `/api/v1/tape/${id}`,
    data: {
      colorCode,
      title,
      name,
    },
  });
};

const downloadTape = (id: number) =>
  instance({ url: `/api/v1/tape/download/${id}` });

const getUserTrack = (id: number) => instance({ url: `/api/v1/track/${id}` });

const subInstance = {
  getUserTape,
  getGuestTape,
  createUserTape,
  modifyUseTape,
  downloadTape,
  getUserTrack,
};

export default subInstance;
