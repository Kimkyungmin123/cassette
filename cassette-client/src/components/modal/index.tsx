import Button from 'components/button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

import {
  ModalContainer,
  ModalContent,
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
  entryLink?: string;
}
const Modal = ({
  icon,
  title,
  detail,
  btnText,
  onClickBtn,
  link,
  entryLink,
}: ModalProps) => {
  const route = useRouter();
  return (
    <ModalContainer>
      <ModalWrapper>
        <ModalContent role="dialog">
          <ModalTitle>{icon}</ModalTitle>
          <ModalTitle>{title}</ModalTitle>
          <ModalDetail>{detail}</ModalDetail>
          <Link href={link}>
            <Button onClick={onClickBtn} variant="main">
              {btnText}
            </Button>
          </Link>

          <Button
            onClick={entryLink ? () => route.push(entryLink) : onClickBtn}
            variant="clear"
          >
            닫기
          </Button>
        </ModalContent>
      </ModalWrapper>
    </ModalContainer>
  );
};

export default Modal;
