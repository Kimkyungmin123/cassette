import Completed from '@icon/completed.svg';
import Copy from '@icon/copy.svg';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import AudioPlayer from 'components/audio';
import Button from 'components/button';
import MenuLayout from 'components/menu';
import Tape from 'components/tape';
import EmptyTape from 'components/tape/emptyTape';
import TapeSVG from 'components/tape/tape';
import Title from 'components/title';
import ToastUI from 'components/Toast';
import useCopy from 'hooks/useCopy';
import { useEffect, useState } from 'react';
import {
  useColorStore,
  usePlayStore,
  useResponsUserStore,
  useUserStore,
} from 'store';
import {
  BottomZone,
  Box,
  CompletedTapeContainer,
  CurrentName,
  GuestTrack,
  PopupText,
  TapeCount,
  ToastZone,
  TrackBox,
  TrackCollection,
  TrackName,
} from 'styles/create-tape-completed';
import theme from 'styles/theme';
import { Color } from 'types';
import { TapeResponse, Track } from 'types/serverResponse';
import subInstance from 'utils/api/sub';

const getUserTape = async () => {
  const data = await subInstance.getUserTape();
  return data?.result[0];
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['tapeData'], getUserTape);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const CreateTapeCompleted = () => {
  const { setResponsUser, userURL, tapeId } = useResponsUserStore();
  const { userNickname, tapename, setUserData, date } = useUserStore();
  const { setTapeColor, tapeColor } = useColorStore();
  const [isCopied, onCopy] = useCopy();
  const [onToast, setOnToast] = useState<boolean>(true);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [currentTapeId, setCurrentTapeId] = useState<number | null>(null);
  const [currentTrack, setCurrentTrack] = useState<TapeResponse<Track>>();
  const [fullTapeLink, setFullTapeLink] = useState<string | null>('');
  const [isFullTape, setIsFullTape] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { setDate } = useUserStore();
  const { isPlayAudio, setIsPlayAudio } = usePlayStore();

  const GUEST_URL = `${process.env.NEXT_PUBLIC_CLIENT_URL}/guest/${userURL}/guest-entry`;
  const MAX_NUMBER = 99999999;

  const { data: tapeData } = useQuery(['tapeData'], getUserTape);

  useEffect(() => {
    if (tapeData) {
      setUserData(tapeData['name'], tapeData['title']);
      setResponsUser(tapeData['tapeLink'], tapeData['id']);
      setTapeColor(tapeData['colorCode']);
      setTracks(tapeData.tracks);
      setFullTapeLink(tapeData['audioLink']);
      setDate(tapeData['createAt'].slice(2, 10).replaceAll('-', '.'));
    }
  }, [setResponsUser, setUserData, setTapeColor, setDate, tapeData]);

  useEffect(() => {
    if (currentTapeId && currentTapeId !== (tapeId as number) * MAX_NUMBER)
      subInstance
        .getUserTrack(currentTapeId)
        .then((data) => setCurrentTrack(data));
  }, [currentTapeId]);

  useEffect(() => {
    if (currentIndex === -1) return;
    const index = tracks.findIndex((data) => data.trackId === currentIndex);
    setCurrentIndex(index);
  }, [setCurrentIndex]);

  const handleCopyClipBoard = (text: string) => {
    onCopy(text);
  };

  // useEffect(() => {
  //   if (currentTapeId)
  //     !isFullTape && currentTapeId
  //       ? currentTrack?.result.audioLink as string)
  //       : fullTapeLink as string);
  // }, [currentTapeId, currentTrack?.result.audioLink, fullTapeLink, isFullTape]);

  const MoveForward = () => {
    if (currentIndex <= 0 || tracks.length - 1 < currentIndex) return;
    if (fullTapeLink && isFullTape) {
      setCurrentIndex(11);
      setCurrentTapeId(tracks[11].trackId);
      setIsFullTape(false);
    } else {
      const forwardId = tracks[currentIndex - 1].trackId;
      const forwardIndex = tracks.findIndex(
        (data) => data.trackId === forwardId,
      );

      setCurrentTapeId(forwardId);
      setCurrentIndex(forwardIndex);
      setIsPlayAudio(false);
    }
  };

  const MoveBackward = () => {
    if (currentIndex < 0 || tracks.length - 1 < currentIndex) return;
    if (fullTapeLink && currentIndex === 11) {
      setCurrentTapeId((tapeId as number) * MAX_NUMBER);
      setIsFullTape(true);
    } else {
      if (tracks.length - 1 === currentIndex) return;
      const backwardId = tracks[currentIndex + 1].trackId;
      const backwardIndex = tracks.findIndex(
        (data) => data.trackId === backwardId,
      );

      setCurrentTapeId(backwardId);
      setCurrentIndex(backwardIndex);
      setIsFullTape(false);
      setIsPlayAudio(false);
    }
  };

  const onClickTape = (id: number, isFull: boolean, index: number) => {
    if (tracks.length < 3) return;
    if (id === (tapeId as number) * MAX_NUMBER && tracks.length !== 12) return;

    setCurrentTapeId(id);
    isFull
      ? setIsFullTape(true)
      : (setIsFullTape(false), setCurrentIndex(index));
  };

  const handleDownloadClick = () => {
    if (currentTapeId) {
      const currentFile =
        !isFullTape && currentTapeId
          ? (currentTrack?.result.audioLink as string)
          : (fullTapeLink as string);

      const downloadLink = document.createElement('a');
      downloadLink.href = currentFile;
      downloadLink.download = 'audio.wav';
      downloadLink.target = '_blank';
      downloadLink.rel = 'noopener noreferrer';
      window.open(downloadLink.href);
    }
  };

  return (
    <CompletedTapeContainer>
      <MenuLayout name={userNickname} />
      <Box>
        <Title name={userNickname} color={theme.colors.white} />
      </Box>
      <CurrentName>
        {!isFullTape && currentTapeId ? (
          <span>{currentTrack?.result.name}</span>
        ) : (
          <div></div>
        )}
      </CurrentName>
      <TrackBox isShown={tracks.length > 2}>
        <TapeSVG
          title={
            !isFullTape && currentTapeId ? currentTrack?.result.title : tapename
          }
          date={
            !isFullTape && currentTapeId
              ? currentTrack?.result.createAt.slice(2, 10).replaceAll('-', '.')
              : date
          }
          color={
            !isFullTape && currentTapeId
              ? currentTrack?.result.colorCode
              : (tapeColor as Color)
          }
          sec="144"
          isPlaying={isPlayAudio}
        />
      </TrackBox>

      <AudioPlayer
        disabled={!currentTapeId || tracks.length < 3}
        audioLink={
          !isFullTape && currentTapeId
            ? (currentTrack?.result.audioLink as string)
            : (fullTapeLink as string)
        }
        onhandleDownload={handleDownloadClick}
        onhandleBackward={MoveBackward}
        onhandleForward={MoveForward}
        preventMovingForward={currentIndex === 0}
        preventMovingBack={
          ((!fullTapeLink && currentIndex === tracks.length - 1) as boolean) ||
          ((fullTapeLink &&
            currentTapeId === (tapeId as number) * MAX_NUMBER) as boolean)
        }
      />
      <TapeCount>
        <span> Total {tracks.length}/12</span>
      </TapeCount>
      <TrackCollection>
        {tracks
          .filter((data) => data.trackId !== currentTapeId)
          .map((data, index) => (
            <>
              <GuestTrack
                key={data.trackId}
                isShown={tracks.length > 2}
                onClick={() => onClickTape(data.trackId, false, index)}
              >
                <>
                  <Tape
                    width="88"
                    height="58"
                    date={data.createAt.slice(2, 10).replaceAll('-', '.')}
                    title={data.title}
                    color={data.colorCode}
                    audioLink={tracks.length > 2 ? data.audioLink : ''}
                  />
                  <TrackName>{data.name}</TrackName>
                </>
              </GuestTrack>
            </>
          ))}
        <EmptyTape
          isShown={tracks.length > 2}
          emptyNum={tracks.length}
          MaxNum={12}
        ></EmptyTape>
        {currentTapeId !== (tapeId as number) * MAX_NUMBER ? (
          <GuestTrack
            key={(tapeId as number) * MAX_NUMBER}
            onClick={() =>
              onClickTape((tapeId as number) * MAX_NUMBER, true, 12)
            }
            isShown={tracks.length === 12}
          >
            <Tape
              width="88"
              height="58"
              title={tapename}
              color={tapeColor as Color}
              audioLink={fullTapeLink as string}
            />
            <TrackName>{userNickname}</TrackName>
          </GuestTrack>
        ) : null}
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
