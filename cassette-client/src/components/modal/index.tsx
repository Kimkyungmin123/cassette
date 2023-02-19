import Button from 'components/button';
import Link from 'next/link';
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
  onClickBtn?: () => void;
  link: string;
}
const Modal = ({
  icon,
  title,
  detail,
  btnText,
  onClickBtn,
  link,
}: ModalProps) => {
  return (
    <ModalContainer>
      <ModalWrapper>
        <ModalTitle>{icon}</ModalTitle>
        <ModalTitle>{title}</ModalTitle>
        <ModalDetail>{detail}</ModalDetail>
        <Link href={link}>
          <Button onClick={onClickBtn} variant="main">
            {btnText}
          </Button>
        </Link>
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
