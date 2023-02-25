import CheckeRectangle from '@icon/checkeRectangle.svg';
import Cry from '@icon/cry.svg';
import Left from '@icon/left.svg';
import Siren from '@icon/siren.svg';
import Button from 'components/button';
import Modal from 'components/modal';
import ModalPortal from 'components/modal/portal';
import Tape from 'components/tape';
import Title from 'components/title';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { useGuestColorStore, useGuestInfoStore } from 'store';
import { Box } from 'styles/create-tape';
import {
  BackButtonZone,
  MakeTapeContainer,
  SubmitTapeButton,
  WarningZone,
} from 'styles/make-track';
import theme from 'styles/theme';
import subInstance from 'utils/api/sub';
import audioInstance from 'utils/audio/audio';

const MakeTrack = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [blob, setBlob] = useState<Blob>();
  const [firstEntry, setFirstEntry] = useState<boolean>(true);
  const [isRedording, setIsRedording] = useState<boolean>(false);
  const [fullTape, setFullTape] = useState<boolean>(false);
  const { date, userNickname, tapename } = useGuestInfoStore();
  const { tapeColor } = useGuestColorStore();
  const router = useRouter();
  const { id } = router.query;
  const MAKE_TAPE_URL = `${process.env.NEXT_PUBLIC_CLIENT_URL}`;
  const GUEST_ENTRY_URL = `/guest/${id}/guest-entry`;
  const sendTape = () => {
    if (blob) {
      audioInstance.getWaveBlob(blob, false).then((res) => {
        console.log(blob);
        console.log(res);
        const audiofile = new File([res], 'audiofile.wav', {
          type: 'audio/wav',
        });
        subInstance
          .createTrack(
            tapeColor,
            tapename,
            userNickname,
            id as string,
            audiofile,
          )
          .then(() => {
            setModalOpen(true);
          })
          .catch(() => {
            setFullTape(true);
            setModalOpen(true);
          });
      });

      // subInstance
      //   .createTrack(tapeColor, tapename, userNickname, id as string, audiofile)
      //   .then(() => {
      //     setModalOpen(true);
      //   })
      //   .catch(() => {
      //     setFullTape(true);
      //     setModalOpen(true);
      //   });
    }
  };

  const closeModal = () => setModalOpen(false);
  const route = useRouter();
  return (
    <MakeTapeContainer>
      <BackButtonZone>
        <Button variant="clear" onClick={() => route.back()}>
          <Left />
        </Button>
      </BackButtonZone>
      <ModalPortal closeModal={closeModal}>
        {modalOpen && (
          <Modal
            icon={fullTape ? <Cry /> : <CheckeRectangle />}
            title={
              fullTape ? (
                <>테이프를 남길 자리가 없어요!</>
              ) : (
                <>
                  목소리가 녹음된 테이프가
                  <br />
                  전송되었어요!
                </>
              )
            }
            detail="친구들의 목소리가 담긴 테이프를 갖고싶나요?"
            btnText="내 테이프 만들기"
            link={MAKE_TAPE_URL}
            onClickBtn={closeModal}
            entryLink={GUEST_ENTRY_URL}
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
          setAudio={setBlob as Dispatch<SetStateAction<Blob>>}
          isOwner={false}
          firstEntry={firstEntry}
          setFirstEntry={setFirstEntry}
          setIsRedording={setIsRedording}
        />
      </Box>
      <WarningZone firstEntry={firstEntry}>
        {!firstEntry ? (
          <>
            <Siren />
            <p>
              테이프 전송하기를 누르면 주인장에게 녹음테이프가
              <br /> 바로 전송됩니다. 충분히 확인 후 전송해주세요.
            </p>
          </>
        ) : null}
      </WarningZone>

      <SubmitTapeButton
        onClick={sendTape}
        variant="main"
        disabled={firstEntry || isRedording}
      >
        테이프 전송하기
      </SubmitTapeButton>
    </MakeTapeContainer>
  );
};

export default MakeTrack;
