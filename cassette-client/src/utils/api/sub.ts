import axios from 'axios';
import { Color } from 'types';
import { Cassette, Tape, TapeResponse, Track } from 'types/serverResponse';

import instance from './core';

const getUserTape = () =>
  instance<TapeResponse<Cassette[]>, TapeResponse<Cassette[]>>({
    url: `/api/v1/tape`,
  });

const getGuestTape = (id: number) => instance({ url: `/api/v1/tape${id}` });

const createUserTape = (colorCode: Color, title: string, name: string) => {
  return instance<TapeResponse<Tape>, TapeResponse<Tape>>({
    method: 'post',
    url: `/api/v1/tape`,
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
  return instance<TapeResponse<Tape>, TapeResponse<Tape>>({
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

const getUserTrack = (id: number) =>
  instance<TapeResponse<Track>, TapeResponse<Track>>({
    url: `/api/v1/track/${id}`,
  });

const getOwnerTape = (tapeLink: string) =>
  axios
    .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/tape/${tapeLink}`)
    .then((data) => data.data);

const createTrack = (
  colorCode: Color,
  title: string,
  name: string,
  tapeLink: string,
  file: File,
) => {
  const data = { colorCode, title, name, tapeLink };
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  formData.append('file', file);
  formData.append('data', blob);

  return axios({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/track`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });
};

const downloadTrack = (id: number) =>
  instance({ url: `/api/v1/track/download/${id}` });

const subInstance = {
  getUserTape,
  getGuestTape,
  createUserTape,
  modifyUseTape,
  downloadTape,
  getUserTrack,
  getOwnerTape,
  createTrack,
  downloadTrack,
};

export default subInstance;
