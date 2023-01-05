import { MouseEventHandler, ReactNode } from 'react';
import { ButtonType } from 'types';

import { ButtonLayout } from './style';

export interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  disabled?: boolean;
  variant: ButtonType;
}

const Button = ({ children, onClick, variant }: ButtonProps) => {
  return (
    <>
      <ButtonLayout role="button" onClick={onClick} variant={variant}>
        {children}
      </ButtonLayout>
    </>
  );
};

export default Button;
