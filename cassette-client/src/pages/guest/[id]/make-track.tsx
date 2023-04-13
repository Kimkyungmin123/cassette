import Left from '@icon/left.svg';
import Siren from '@icon/siren.svg';
import { ButtonLayout } from 'components/button/style';
import SpinnerIcon from 'components/spinner';
import Tape from 'components/tape';
import Title from 'components/title';
import useLoading from 'hooks/useLoading';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { useGuestColorStore, useGuestInfoStore, useRecordStore } from 'store';
import { Box } from 'styles/create-tape';
import {
  BackButtonZone,
  MakeTapeContainer,
  WarningZone,
} from 'styles/make-track';
import theme from 'styles/theme';
import { Color } from 'types';
import subInstance from 'utils/api/sub';
import audioInstance from 'utils/audio/convert';

const Cry = dynamic(() => import('@icon/cry.svg'));
const CheckeRectangle = dynamic(() => import('@icon/checkeRectangle.svg'));
const Modal = dynamic(() => import('components/modal'));
const ModalPortal = dynamic(() => import('components/modal/portal'));

const MakeTrack = () => {
  const route = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [blob, setBlob] = useState<Blob>();
  const [firstEntry, setFirstEntry] = useState<boolean>(true);
  const [isRedording, setIsRedording] = useState<boolean>(false);
  const [fullTape, setFullTape] = useState<boolean>(false);

  const { isGlobalRecording } = useRecordStore();
  const { date, userNickname, tapename } = useGuestInfoStore();
  const { tapeColor } = useGuestColorStore();

  const { isLoading, setIsLoading } = useLoading();

  const router = useRouter();
  const { id } = router.query;
  const MAKE_TAPE_URL = `${process.env.NEXT_PUBLIC_CLIENT_URL}`;
  const GUEST_ENTRY_URL = `/guest/${id}/guest-entry`;

  const closeModal = () => setModalOpen(false);

  const sendTape = () => {
    setIsLoading(true);

    if (blob) {
      audioInstance.getWaveBlob(blob, false).then((res) => {
        const audiofile = new File([res], 'audiofile.wav', {
          type: 'audio/wav',
        });
        if (!isRedording) {
          subInstance
            .createTrack(
              tapeColor as Color,
              tapename,
              userNickname,
              `${id}`,
              audiofile,
            )
            .then(() => {
              setModalOpen(true);
              setIsLoading(false);
            })
            .catch(() => {
              setFullTape(true);
              setModalOpen(true);
              setIsLoading(false);
            });
        }
      });
    }
  };

  return (
    <MakeTapeContainer>
      <BackButtonZone>
        <ButtonLayout
          variant="clear"
          aria-label="뒤로 가기"
          onClick={() => route.back()}
        >
          <Left fill={theme.colors.gray_700} />
        </ButtonLayout>
      </BackButtonZone>
      <ModalPortal closeModal={closeModal} isCreatedTrack={true}>
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
        {!firstEntry && isGlobalRecording ? (
          <>
            <Siren />
            <p>
              테이프 전송하기를 누르면 주인장에게 녹음테이프가
              <br /> 바로 전송됩니다. 충분히 확인 후 전송해주세요.
            </p>
          </>
        ) : null}
      </WarningZone>

      <ButtonLayout
        onClick={sendTape}
        variant="main"
        disabled={firstEntry || isRedording || isLoading}
        isLoading={isLoading}
      >
        {isLoading ? <SpinnerIcon /> : <span>테이프 전송하기</span>}
      </ButtonLayout>
    </MakeTapeContainer>
  );
};

export default MakeTrack;
