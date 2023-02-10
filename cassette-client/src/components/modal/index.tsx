import Button from 'components/button';
import { ReactNode } from 'react';

import {
  ModalContainer,
  ModalDetail,
  ModalTitle,
  ModalWrapper,
} from './styles';

interface ModalProps {
  icon: ReactNode;
  title: ReactNode;
  detail?: string;
  btnText: string;
  onClickBtn: () => void;
}
const Modal = ({ icon, title, detail, btnText, onClickBtn }: ModalProps) => {
  return (
    <ModalContainer>
      <ModalWrapper>
        <ModalTitle>{icon}</ModalTitle>
        <ModalTitle>{title}</ModalTitle>
        <ModalDetail>{detail}</ModalDetail>
        <Button onClick={onClickBtn} variant="main">
          {btnText}
        </Button>
        <Button
          onClick={() => {
            /* close modal */
          }}
          variant="clear"
        >
          닫기
        </Button>
      </ModalWrapper>
    </ModalContainer>
  );
};

export default Modal;
