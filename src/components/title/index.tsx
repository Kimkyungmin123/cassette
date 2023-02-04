import React from 'react';
import theme from 'styles/theme';

import { TitleName, TitleWrapper } from './styles';

interface TitleProps {
  name: string;
  color?: string;
}
const Title = ({ name, color }: TitleProps) => {
  return (
    <TitleWrapper>
      <TitleName color={color}>{name}</TitleName>&apos;s Tape
    </TitleWrapper>
  );
};

export default Title;
