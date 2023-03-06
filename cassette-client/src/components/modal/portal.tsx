import { MouseEvent, ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { ModalDimmed } from './styles';

interface PortalProps {
  children: ReactNode;
  id?: string;
  closeModal: () => void;
  isCreatedTrack?: boolean;
}
const Portal = ({
  children,
  closeModal,
  id = 'modal',
  isCreatedTrack = false,
}: PortalProps) => {
  const [el, setEl] = useState<HTMLElement | null>(null);

  const handleClose = (e: MouseEvent) => {
    if (isCreatedTrack) return;
    if (e.target !== e.currentTarget) return;
    closeModal();
  };

  useEffect(() => {
    const targetEl = document.getElementById(id);
    if (targetEl) {
      setEl(targetEl);
    }
  }, [id]);

  if (children && el) {
    return ReactDOM.createPortal(
      <ModalDimmed onClick={handleClose}>{children}</ModalDimmed>,
      el,
    );
  }

  return <></>;
};

export default Portal;
