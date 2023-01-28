import { MouseEventHandler, ReactNode } from 'react';
import { ButtonType, Color } from 'types';

import { ButtonLayout } from './style';

export interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  disabled?: boolean;
  variant: ButtonType;
  color?: Color;
}

const Button = ({ children, onClick, variant, color }: ButtonProps) => {
  return (
    <>
      <ButtonLayout
        role="button"
        onClick={onClick}
        variant={variant}
        color={color}
      >
        <div>{children}</div>
      </ButtonLayout>
    </>
  );
};

export default Button;
