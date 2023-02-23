import Completed from '@icon/completed.svg';
import Copy from '@icon/copy.svg';
import AudioPlayer from 'components/audio';
import Button from 'components/button';
import MenuLayout from 'components/menu';
import Tape from 'components/tape';
import TapeSVG from 'components/tape/tape';
import Title from 'components/title';
import ToastUI from 'components/Toast';
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
import { TapeResponse, Track } from 'types/serverResponse';
import subInstance from 'utils/api/sub';

const CreateTapeCompleted = () => {
  const { setResponsUser, userURL } = useResponsUserStore();
  const { userNickname, tapename, setUserData, date } = useUserStore();
  const { setTapeColor, tapeColor } = useColorStore();
  const [isCopied, onCopy] = useCopy();
  const [onToast, setOnToast] = useState<boolean>(true);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTapeId, setCurrentTapeId] = useState<number | null>(null);
  const [currentTrack, setCurrentTrack] = useState<TapeResponse<Track>>();

  const handleCopyClipBoard = (text: string) => {
    onCopy(text);
  };

  const GUEST_URL = `${process.env.NEXT_PUBLIC_CLIENT_URL}/guest/${userURL}/guest-entry`;

  useEffect(() => {
    subInstance.getUserTape().then((data) => {
      console.log(data);
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

  useEffect(() => {
    if (currentTapeId)
      subInstance
        .getUserTrack(currentTapeId)
        .then((data) => setCurrentTrack(data));
  }, [currentTapeId]);

  return (
    <CompletedTapeContainer>
      <MenuLayout name={userNickname} />
      <Box>
        <Title name={userNickname} color={theme.colors.white} />
      </Box>
      <TapeCount>
        {tracks.length === 0 || tracks.length === 1 ? (
          <span>{tracks.length} tape</span>
        ) : (
          <span>{tracks.length} tapes</span>
        )}
        <span> / 12 tapes</span>
      </TapeCount>
      <TrackBox isShown={tracks.length > 2}>
        <TapeSVG
          title={currentTapeId ? currentTrack?.result.title : tapename}
          date={
            currentTapeId
              ? currentTrack?.timestamp.slice(2, 10).replaceAll('-', '.')
              : date
          }
          color={currentTapeId ? currentTrack?.result.colorCode : tapeColor}
          sec="144"
        />
      </TrackBox>

      <AudioPlayer
        disabled={tracks.length < 3}
        audioLink={
          currentTapeId ? (currentTrack?.result.audioLink as string) : ''
        }
      />
      <TrackCollection>
        {tracks.map((data) => (
          <GuestTrack
            key={data.trackId}
            isShown={tracks.length > 2}
            onClick={() => {
              setCurrentTapeId(data.trackId);
            }}
          >
            <Tape
              width="88"
              height="58"
              title={data.title}
              color={data.colorCode}
              audioLink={tracks.length > 2 ? data.audioLink : ''}
            />
            <TrackName>{data.name}</TrackName>
          </GuestTrack>
        ))}
      </TrackCollection>

      {tracks.length < 3 && (
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
