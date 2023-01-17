import Button from 'components/button';
import Modal from 'components/modal';
import ModalPortal from 'components/modal/portal';
import Tape from 'components/tape';
import Title from 'components/title';
import React, { useState } from 'react';
import theme from 'styles/theme';
import { Box } from './create-tape/styles';

const ListenTape = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const sendTape = () => {
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <ModalPortal closeModal={closeModal}>
        {modalOpen && (
          <Modal
            icon="✅"
            title={
              <>
                목소리가 녹음된 테이프가
                <br />
                전송되었어요!
              </>
            }
            detail="친구들의 목소리가 담긴 테이프를 갖고싶나요?"
            btnText="내 테이프 만들기"
            onClickBtn={() => {}}
          />
        )}
      </ModalPortal>
      <Box margin="0 0 24px 0">
        <Title name="게스트" color={theme.colors.white} />
      </Box>
      <Box margin="0 0 44px 0">
        <Tape title="2023 한정판 테이프" date="21.01.01" sec="144" />
      </Box>

      <Button onClick={sendTape} variant="main">
        테이프 전송하기
      </Button>
    </div>
  );
};

export default ListenTape;
