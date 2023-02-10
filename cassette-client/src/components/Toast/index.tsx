import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';

import { Content, ToastBox } from './style';

interface ToastUIProps {
  children: ReactNode;
  onClose: Dispatch<SetStateAction<boolean>>;
}

const ToastUI = ({ children, onClose }: ToastUIProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);
  return (
    <ToastBox>
      <Content>{children}</Content>
    </ToastBox>
  );
};

export default ToastUI;
