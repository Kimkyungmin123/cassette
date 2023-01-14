import { MouseEventHandler, ReactNode } from 'react';
import { useStore } from 'store';
import { ButtonType, Color } from 'types';

import { ButtonLayout } from './style';

export interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  disabled?: boolean;
  variant: ButtonType;
  color?: Color;
}

const Button = ({ children, onClick, variant }: ButtonProps) => {
  const { tapeColor } = useStore();
  return (
    <>
      <ButtonLayout
        role="button"
        onClick={onClick}
        variant={variant}
        color={tapeColor}
      >
        <div>{children}</div>
      </ButtonLayout>
    </>
  );
};

export default Button;
