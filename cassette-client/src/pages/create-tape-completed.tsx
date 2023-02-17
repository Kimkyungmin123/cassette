import Completed from '@icon/completed.svg';
import Copy from '@icon/copy.svg';
import AudioPlayer from 'components/audio';
import Button from 'components/button';
import MenuLayout from 'components/menu';
import Tape from 'components/tape';
import TapeSVG from 'components/tape/tape';
import Title from 'components/title';
import ToastUI from 'components/Toast';
import { trackArray_TEN, trackArray_TWO } from 'constants/trackDummyData';
import useCopy from 'hooks/useCopy';
import { useEffect, useState } from 'react';
import { useColorStore, useResponsUserStore, useUserStore } from 'store';
import {
  BottomZone,
  Box,
  CompletedTapeContainer,
  GuestTrack,
  PopupText,
  TapeCount,
  ToastZone,
  TrackBox,
  TrackCollection,
  TrackName,
} from 'styles/create-tape-completed';
import theme from 'styles/theme';
import { Track } from 'types/serverResponse';
import subInstance from 'utils/api/sub';

const CreateTapeCompleted = () => {
  const { setResponsUser, userURL } = useResponsUserStore();
  const { userNickname, tapename, setUserData, date } = useUserStore();
  const { setTapeColor } = useColorStore();
  const [isCopied, onCopy] = useCopy();
  const [onToast, setOnToast] = useState<boolean>(true);
  const [tracks, setTracks] = useState<Track[]>([]);

  const handleCopyClipBoard = (text: string) => {
    onCopy(text);
  };

  const GUEST_URL = `${process.env.NEXT_PUBLIC_CLIENT_URL}/guest/${userURL}/guest-entry`;
  const andio_File =
    'https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/af52a99b-88c0-4638-b120-d46e142d06d3/audio/500344fb-2e2b-48af-be86-af6ac341a6da/default_tc.mp3';

  useEffect(() => {
    subInstance.getUserTape().then((data) => {
      const tapeData = data?.result[0];
      if (tapeData) {
        setUserData(tapeData['name'], tapeData['title']);
        setResponsUser(tapeData['tapeLink']);
        setTapeColor(tapeData['colorCode']);
        setTracks(tapeData.tracks);
      }
    });
  }, [setResponsUser, setUserData, setTapeColor]);

  // TODO: server, client tape fill 매치되지 않는 에러 해결하기

  return (
    <CompletedTapeContainer>
      <MenuLayout name={userNickname} />
      <Box>
        <Title name={userNickname} color={theme.colors.white} />
      </Box>
      <TapeCount>
        {trackArray_TEN.length === 0 || trackArray_TEN.length === 1 ? (
          <span>{trackArray_TEN.length} tape</span>
        ) : (
          <span>{trackArray_TEN.length} tapes</span>
        )}
        <span> / 12 tapes</span>
      </TapeCount>
      <TrackBox isShown={trackArray_TEN.length > 3}>
        <TapeSVG title={tapename} date={date} sec="144" />
      </TrackBox>

      <AudioPlayer audioLink={andio_File} />
      <TrackCollection>
        {trackArray_TEN.map((data) => (
          <GuestTrack
            key={data.result.trackId}
            isShown={trackArray_TEN.length > 3}
            onClick={() => {
              console.log('click');
            }}
          >
            <Tape
              width="88"
              height="58"
              title={data.result.title}
              color={data.result.colorCode}
              date={data.timestamp.slice(2, 10).replaceAll('-', '.')}
              audioLink={trackArray_TWO.length > 3 ? data.result.audioLink : ''}
            />
            <TrackName>{data.result.name}</TrackName>
          </GuestTrack>
        ))}
      </TrackCollection>

      {trackArray_TEN.length < 4 && (
        <PopupText>
          <Tape width={'25'} height={'20'} />
          <Box margin={'0 0 0 4px'}>
            X 3 테이프가 최소 3개가 모여야 들을 수 있어요! <br />
            친구들에게 더 공유해볼까요?
          </Box>
        </PopupText>
      )}
      <BottomZone>
        <Button
          variant="main"
          onClick={() => {
            handleCopyClipBoard(`${GUEST_URL}`);
            setOnToast(true);
          }}
        >
          <Copy />내 테이프 공유하기
        </Button>
        {isCopied && onToast ? (
          <ToastZone>
            <ToastUI onClose={setOnToast}>
              <Completed />내 테이프 링크를 복사했어요!
            </ToastUI>
          </ToastZone>
        ) : null}
      </BottomZone>
    </CompletedTapeContainer>
  );
};

export default CreateTapeCompleted;
