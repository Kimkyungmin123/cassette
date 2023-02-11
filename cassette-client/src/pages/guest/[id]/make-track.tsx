import Button from 'components/button';
import Modal from 'components/modal';
import ModalPortal from 'components/modal/portal';
import Tape from 'components/tape';
import Title from 'components/title';
import { useState } from 'react';
import { Box } from 'styles/create-tape';
import theme from 'styles/theme';
import subInstance from 'utils/api/sub';

const makeTrack = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [blob, setBlob] = useState<Blob>();

  const sendTape = () => {
    const formData = new FormData();
    console.log(blob);
    if (blob) {
      //const file = new File([blob], 'fileName', { type: 'audio/webm' });
      formData.append('audio', blob, 'audio.wav');
      console.log('blob', blob);
      console.log(formData);

      subInstance
        .createTrack('cassette_blue', 'jjjjjjjjj', '', '', formData)
        .then(() => {
          // setModalOpen(true);
        });
    }

    console.log({ blob });
  };

  const closeModal = () => setModalOpen(false);

  return (
    <div css={{ padding: '163px 24px 0 24px  ' }}>
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
            onClickBtn={() => {
              console.log('click');
            }}
          />
        )}
      </ModalPortal>
      <Box margin="0 0 24px 0">
        <Title name="게스트" color={theme.colors.white} />
      </Box>
      <Box margin="0 0 44px 0">
        <Tape
          title="2023 한정판 테이프"
          date="21.01.01"
          sec="144"
          hasAudio
          setAudio={setBlob}
        />
      </Box>

      <Button
        onClick={
          () => setModalOpen(true)
          //sendTape
        }
        variant="main"
      >
        테이프 전송하기
      </Button>
    </div>
  );
};

export default makeTrack;
