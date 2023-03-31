import { MouseEventHandler, ReactNode } from 'react';
import { Color } from 'types';

import SpinnerIcon from './spinner';
import { ButtonLayout } from './style';

export type ButtonType = 'main' | 'guest' | 'clear';

export interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
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
}: ButtonProps) => {
  return (
    <>
      <ButtonLayout
        role="button"
        onClick={onClick}
        variant={variant}
        color={color}
        isLoading={isLoading}
      >
        <> {isLoading ? <SpinnerIcon /> : <div>{children}</div>}</>
      </ButtonLayout>
    </>
  );
};

export default Button;
