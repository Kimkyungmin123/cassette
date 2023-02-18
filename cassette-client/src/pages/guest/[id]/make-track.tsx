import Siren from '@icon/siren.svg';
import Button from 'components/button';
import Modal from 'components/modal';
import ModalPortal from 'components/modal/portal';
import Tape from 'components/tape';
import Title from 'components/title';
import { useState } from 'react';
import {
  useGuestColorStore,
  useGuestInfoStore,
  useGuestResponsStore,
  useRecord,
} from 'store';
import { Box } from 'styles/create-tape';
import { MakeTapeContainer, WarningZone } from 'styles/make-track';
import theme from 'styles/theme';
import subInstance from 'utils/api/sub';

const MakeTrack = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [blob, setBlob] = useState<Blob>();
  const { date, userNickname, tapename } = useGuestInfoStore();
  const { tapeColor } = useGuestColorStore();
  const { userURL } = useGuestResponsStore();
  const { recordFile } = useRecord();

  const sendTape = () => {
    const formData = new FormData();
    console.log(blob);
    //const file = new File([blob], 'fileName', { type: 'audio/webm' });
    console.log('blob', blob);
    console.log('formData', formData);

    subInstance
      .createTrack(
        `${tapeColor}`,
        `${tapename}`,
        `${userNickname}`,
        `${userURL}`,
        formData,
      )
      .then((data) => {
        console.log(data);
        // setModalOpen(true);
      });

    console.log({ blob });
  };

  const closeModal = () => setModalOpen(false);

  return (
    <MakeTapeContainer>
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
        <Title name={userNickname} color={theme.colors.white} />
      </Box>
      <Box margin="0 0 44px 0">
        <Tape
          title={tapename}
          date={date}
          sec="144"
          hasAudio
          setAudio={setBlob}
        />
      </Box>
      <WarningZone>
        <Siren />
        <p>
          테이프 전송하기를 누르면 주인장에게 녹음테이프가
          <br /> 바로 전송됩니다. 충분히 확인 후 전송해주세요.
        </p>
      </WarningZone>

      <Button
        onClick={() => {
          setModalOpen(true);
          sendTape();
        }}
        variant="main"
      >
        테이프 전송하기
      </Button>
    </MakeTapeContainer>
  );
};

export default MakeTrack;
