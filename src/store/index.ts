import { Color } from 'types';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface Store {
  tapeColor: Color;
  setTapeColor: (tapeColor: Color) => void;
}

export const useStore = create<Store>()(
  devtools((set) => ({
    tapeColor: 'cassette_orange',
    setTapeColor: (value) => {
      set(() => ({ tapeColor: value }));
    },
  })),
);
