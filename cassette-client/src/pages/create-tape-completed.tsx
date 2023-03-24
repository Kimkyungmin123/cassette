import Completed from '@icon/completed.svg';
import Copy from '@icon/copy.svg';
import { useQuery } from '@tanstack/react-query';
import AudioPlayer from 'components/audio';
import Button from 'components/button';
import Modal from 'components/modal';
import ModalPortal from 'components/modal/portal';
import Tape from 'components/tape';
import EmptyTape from 'components/tape/emptyTape';
import TapeSVG from 'components/tape/tape';
import Title from 'components/title';
import ToastUI from 'components/Toast';
import useCopy from 'hooks/useCopy';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { usePlayStore } from 'store';
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
import { TapeResponse, Track } from 'types/serverResponse';
import subInstance from 'utils/api/sub';
import downloadFile from 'utils/audio/download';
import date from 'utils/format/date';

const MenuLayout = dynamic(() => import('components/menu'));

const getUserTape = async () => {
  const data = await subInstance.getUserTape();
  return data?.result[0];
};

const CreateTapeCompleted = () => {
  const [isCopied, onCopy] = useCopy();
  const [onToast, setOnToast] = useState<boolean>(true);
  const [currentTapeId, setCurrentTapeId] = useState<number | null>(null);
  const [currentTrack, setCurrentTrack] = useState<TapeResponse<Track>>();
  const [isFullTape, setIsFullTape] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { isPlayAudio, setIsPlayAudio } = usePlayStore();
  const { data: tapeData } = useQuery(['tapeData'], getUserTape);

  const GUEST_URL = `${process.env.NEXT_PUBLIC_CLIENT_URL}/guest/${tapeData?.tapeLink}/guest-entry`;
  const MAX_NUMBER = 99999999;

  useEffect(() => {
    if (
      currentTapeId &&
      currentTapeId !== (tapeData?.id as number) * MAX_NUMBER
    )
      subInstance
        .getUserTrack(currentTapeId)
        .then((data) => setCurrentTrack(data));
  }, [currentTapeId]);

  useEffect(() => {
    if (currentIndex === -1) return;
    if (!tapeData) return;
    const index = tapeData?.tracks.findIndex(
      (data) => data.trackId === currentIndex,
    );
    setCurrentIndex(index);
  }, [setCurrentIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!tapeData) setModalOpen(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => setModalOpen(false);

  const handleCopyClipBoard = (text: string) => {
    onCopy(text);
  };

  const moveForward = () => {
    if (!tapeData) return;
    if (currentIndex <= 0 || tapeData?.tracks.length - 1 < currentIndex) return;
    if (tapeData?.audioLink && isFullTape) {
      setCurrentIndex(11);
      setCurrentTapeId(tapeData?.tracks[11].trackId);
      setIsFullTape(false);
    } else {
      const forwardId = tapeData?.tracks[currentIndex - 1].trackId;
      const forwardIndex = tapeData?.tracks.findIndex(
        (data) => data.trackId === forwardId,
      );

      setCurrentTapeId(forwardId);
      setCurrentIndex(forwardIndex);
      setIsPlayAudio(false);
    }
  };

  const moveBackward = () => {
    if (!tapeData) return;
    if (currentIndex < 0 || tapeData?.tracks.length - 1 < currentIndex) return;
    if (tapeData?.audioLink && currentIndex === 11) {
      setCurrentTapeId(tapeData?.id * MAX_NUMBER);
      setIsFullTape(true);
    } else {
      if (tapeData?.tracks.length - 1 === currentIndex) return;
      const backwardId = tapeData?.tracks[currentIndex + 1].trackId;
      const backwardIndex = tapeData?.tracks.findIndex(
        (data) => data.trackId === backwardId,
      );

      setCurrentTapeId(backwardId);
      setCurrentIndex(backwardIndex);
      setIsFullTape(false);
      setIsPlayAudio(false);
    }
  };

  const onClickTape = (id: number, isFull: boolean, index: number) => {
    if (tapeData && tapeData?.tracks.length < 3) return;
    if (
      id === (tapeData?.id as number) * MAX_NUMBER &&
      tapeData?.tracks.length !== 12
    )
      return;

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
          : (tapeData?.audioLink as string);

      downloadFile(currentFile);
    }
  };

  const Cry = dynamic(() => import('@icon/cry.svg'));

  return (
    <>
      {tapeData ? (
        <CompletedTapeContainer>
          <MenuLayout name={tapeData.name} />
          <Box>
            <Title name={tapeData.name} color={theme.colors.white} />
          </Box>
          <CurrentName>
            {!isFullTape && currentTapeId ? (
              <div>
                <span>{currentTrack?.result.name}</span>
              </div>
            ) : (
              <div></div>
            )}
          </CurrentName>
          <TrackBox isShown={tapeData?.tracks.length > 2}>
            <TapeSVG
              title={
                !isFullTape && currentTapeId
                  ? currentTrack?.result.title
                  : tapeData.title
              }
              date={
                !isFullTape && currentTapeId
                  ? date.formattedDate(currentTrack?.result.createAt as string)
                  : date.formattedDate(tapeData.createAt)
              }
              color={
                !isFullTape && currentTapeId
                  ? currentTrack?.result.colorCode
                  : tapeData.colorCode
              }
              sec="144"
              isPlaying={isPlayAudio}
            />
          </TrackBox>

          <AudioPlayer
            disabled={!currentTapeId || tapeData?.tracks.length < 3}
            audioLink={
              !isFullTape && currentTapeId
                ? (currentTrack?.result.audioLink as string)
                : (tapeData?.audioLink as string)
            }
            onhandleDownload={handleDownloadClick}
            onhandleBackward={moveBackward}
            onhandleForward={moveForward}
            preventMovingForward={currentIndex === 0}
            preventMovingBack={
              ((!tapeData?.audioLink &&
                currentIndex === tapeData?.tracks.length - 1) as boolean) ||
              ((tapeData?.audioLink &&
                currentTapeId ===
                  (tapeData?.id as number) * MAX_NUMBER) as boolean)
            }
          />
          <TapeCount>
            <span> Total {tapeData?.tracks.length}/12</span>
          </TapeCount>
          <TrackCollection>
            {tapeData?.tracks
              .filter((data) => data.trackId !== currentTapeId)
              .map((data, index) => (
                <>
                  <GuestTrack
                    key={data.trackId}
                    isShown={tapeData?.tracks.length > 2}
                    onClick={() => onClickTape(data.trackId, false, index)}
                  >
                    <>
                      <Tape
                        width="88"
                        height="58"
                        date={date.formattedDate(data.createAt)}
                        title={data.title}
                        color={data.colorCode}
                        audioLink={
                          tapeData?.tracks.length > 2 ? data.audioLink : ''
                        }
                      />
                      <TrackName>{data.name}</TrackName>
                    </>
                  </GuestTrack>
                </>
              ))}
            <EmptyTape
              isShown={tapeData?.tracks.length > 2}
              emptyNum={tapeData?.tracks.length}
              MaxNum={12}
            ></EmptyTape>
            {currentTapeId !== (tapeData?.id as number) * MAX_NUMBER ? (
              <GuestTrack
                key={(tapeData?.id as number) * MAX_NUMBER}
                onClick={() =>
                  onClickTape((tapeData?.id as number) * MAX_NUMBER, true, 12)
                }
                isShown={tapeData?.tracks.length === 12}
              >
                <Tape
                  width="88"
                  height="58"
                  title={tapeData.title}
                  color={tapeData.colorCode}
                  audioLink={tapeData?.audioLink as string}
                />
                <TrackName>{tapeData.name}</TrackName>
              </GuestTrack>
            ) : null}
          </TrackCollection>

          {tapeData?.tracks.length < 3 && (
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
      ) : (
        <ModalPortal closeModal={closeModal} isCreatedTrack={true}>
          {modalOpen && (
            <Modal
              icon={<Cry />}
              title={<>테이프가 생성되지 않았어요!</>}
              detail="테이프를 만들어야 사용할 수 있는 서비스예요."
              btnText="내 테이프 만들기"
              link={'/create-tape'}
              onClickBtn={closeModal}
              entryLink={'/create-tape'}
            />
          )}
        </ModalPortal>
      )}
    </>
  );
};

export default CreateTapeCompleted;
