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
import { Color } from 'types';
import subInstance from 'utils/api/sub';
import audioInstance from 'utils/audio/convert';

const MakeTrack = () => {
  const route = useRouter();
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

  const closeModal = () => setModalOpen(false);

  const sendTape = () => {
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
            })
            .catch(() => {
              setFullTape(true);
              setModalOpen(true);
            });
        }
      });
    }
  };

  return (
    <MakeTapeContainer>
      <BackButtonZone>
        <Button variant="clear" onClick={() => route.back()}>
          <Left fill={theme.colors.gray_700} />
        </Button>
      </BackButtonZone>
      <ModalPortal closeModal={closeModal} isCreatedTrack={true}>
        {modalOpen && (
          <Modal
            icon={fullTape ? <Cry /> : <CheckeRectangle />}
            title={
              fullTape ? (
                <>???????????? ?????? ????????? ?????????!</>
              ) : (
                <>
                  ???????????? ????????? ????????????
                  <br />
                  ??????????????????!
                </>
              )
            }
            detail="???????????? ???????????? ?????? ???????????? ????????????????"
            btnText="??? ????????? ?????????"
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
              ????????? ??????????????? ????????? ??????????????? ??????????????????
              <br /> ?????? ???????????????. ????????? ?????? ??? ??????????????????.
            </p>
          </>
        ) : null}
      </WarningZone>

      <SubmitTapeButton
        onClick={sendTape}
        variant="main"
        disabled={firstEntry || isRedording}
      >
        ????????? ????????????
      </SubmitTapeButton>
    </MakeTapeContainer>
  );
};

export default MakeTrack;
