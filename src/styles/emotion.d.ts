import '@emotion/react';

import { ColorsTypes, FontSizeTypes } from './theme';

declare module '@emotion/react' {
  export interface DefaultTheme {
    colors: ColorsTypes;
    fontSize: FontSizeTypes;
  }
}
