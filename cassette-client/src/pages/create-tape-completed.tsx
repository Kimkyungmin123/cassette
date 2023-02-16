import Completed from '@icon/completed.svg';
import Copy from '@icon/copy.svg';
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
  AudioZone,
  BottomZone,
  Box,
  CompletedTapeContainer,
  GuestTrack,
  PlayTime,
  PopupText,
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

  console.log(trackArray_TEN);
  // TODO: server, client tape fill 매치되지 않는 에러 해결하기

  return (
    <CompletedTapeContainer>
      <MenuLayout name={userNickname} />
      <Box>
        <Title name={userNickname} color={theme.colors.white} />
      </Box>
      <PlayTime>
        <span>00:00/02:24</span>
      </PlayTime>
      <TrackBox isShown={trackArray_TEN.length > 3}>
        <TapeSVG title={tapename} date={date} sec="144" />
      </TrackBox>

      <AudioZone></AudioZone>

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
