import Completed from '@icon/completed.svg';
import Copy from '@icon/copy.svg';
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
  ToastZone,
  TrackBox,
  TrackCollection,
  TrackContainer,
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

  // TODO: server, client tape fill 매치되지 않는 에러 해결하기
  return (
    <CompletedTapeContainer>
      <MenuLayout name={userNickname} />
      <Box margin="0 0 24px 0">
        <Title name={userNickname} color={theme.colors.white} />
      </Box>
      <Box margin="0 0 44px 0">
        <TrackBox isShown={tracks.length > 3}>
          <TapeSVG title={tapename} date={date} sec="144" />
        </TrackBox>
      </Box>
      <TrackContainer>
        {tracks?.map((track) => (
          <TrackBox
            key={track.trackId}
            isShown={tracks.length > 3}
            onClick={() => {
              /* */
            }}
          >
            <Tape
              title={track.fileName}
              color={track.colorCode}
              audioLink={tracks.length > 3 ? track.audioLink : ''}
              date="21.01.01"
              sec="144"
              width="88"
              height="80"
            />
            <TrackName>{track.name}</TrackName>
          </TrackBox>
        ))}
      </TrackContainer>
      <TrackCollection>
        <GuestTrack>
          <TapeSVG width="88" height="58" />
          <span>경민</span>
        </GuestTrack>
        <GuestTrack>
          <TapeSVG width="88" height="58" />
          <span>경민</span>
        </GuestTrack>
        <GuestTrack>
          <TapeSVG width="88" height="58" />
          <span>경민</span>
        </GuestTrack>
        <GuestTrack>
          <TapeSVG width="88" height="58" />
          <span>경민</span>
        </GuestTrack>{' '}
        <GuestTrack>
          <TapeSVG width="88" height="58" />
          <span>경민</span>
        </GuestTrack>{' '}
        <GuestTrack>
          <TapeSVG width="88" height="58" />
          <span>경민</span>
        </GuestTrack>{' '}
        <GuestTrack>
          <TapeSVG width="88" height="58" />
          <span>경민</span>
        </GuestTrack>{' '}
        <GuestTrack>
          <TapeSVG width="88" height="58" />
          <span>경민</span>
        </GuestTrack>{' '}
        <GuestTrack>
          <TapeSVG width="88" height="58" />
          <span>경민</span>
        </GuestTrack>{' '}
        <GuestTrack>
          <TapeSVG width="88" height="58" />
          <span>경민</span>
        </GuestTrack>{' '}
        <GuestTrack>
          <TapeSVG width="88" height="58" />
          <span>경민</span>
        </GuestTrack>{' '}
        <GuestTrack>
          <TapeSVG width="88" height="58" />
          <span>경민</span>
        </GuestTrack>
      </TrackCollection>

      {tracks.length < 4 && (
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
