import { MouseEventHandler, ReactNode } from 'react';
import { Color } from 'types';

import { ButtonLayout } from './style';

export type ButtonType = 'main' | 'guest' | 'clear';

export interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  variant: ButtonType;
  color?: Color;
  isLoading?: boolean;
}

const Button = ({
  children,
  onClick,
  variant,
  color,
  isLoading,
  disabled,
}: ButtonProps) => {
  return (
    <ButtonLayout
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      color={color}
      isLoading={isLoading}
    >
      <div>{children}</div>
    </ButtonLayout>
  );
};

export default Button;
