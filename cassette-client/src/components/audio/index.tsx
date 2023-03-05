import FileDownload from '@icon/fileDownload.svg';
import Left from '@icon/left.svg';
import PauseIcon from '@icon/pause.svg';
import Play from '@icon/play.svg';
import Right from '@icon/right.svg';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { usePlayStore } from 'store';
import theme from 'styles/theme';

import {
  Audio,
  AudioButton,
  AudioCOntainer,
  ButtonZone,
  DownloadButton,
  PlayZone,
  ProgressBar,
  TrackControlZone,
} from './style';

interface AudioPlayerProps {
  audioLink: string;
  isOwner?: boolean;
  disabled?: boolean;
  onhandleBackward?: () => void;
  onhandleForward?: () => void;
  onhandleDownload?: () => void;
}

const AudioPlayer = forwardRef<HTMLDivElement, AudioPlayerProps>(
  (
    {
      audioLink,
      isOwner = true,
      disabled,
      onhandleBackward,
      onhandleForward,
      onhandleDownload,
      ...rest
    },
    ref,
  ) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [tempPause, setTempPause] = useState<boolean>(false);

    const audioPlayer = useRef<HTMLAudioElement>(null);
    const progressBar = useRef<HTMLInputElement>(null);
    const animationRef = useRef<number>();

    const { setIsPlayAudio } = usePlayStore();

    useEffect(() => {
      const audio = audioPlayer.current;

      const handleDurationChange = () => {
        if (!audio?.duration) return;
        setDuration(audio?.duration);
        progressBar?.current?.setAttribute('max', `${audio?.duration}`);
      };

      audio?.addEventListener('durationchange', handleDurationChange);

      return () => {
        audio?.removeEventListener('durationchange', handleDurationChange);
      };
    }, [audioPlayer]);

    useEffect(() => {
      currentTime === 0 || duration === currentTime
        ? (setIsPlaying(false), setTempPause(false))
        : setIsPlaying(true);
    }, [currentTime, duration]);

    useEffect(() => {
      isPlaying && !tempPause ? setIsPlayAudio(true) : setIsPlayAudio(false);
    }, [isPlaying, setIsPlayAudio, tempPause]);

    const calculateTime = (secs: number) => {
      const minutes = Math.floor(secs / 60);
      const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.round(secs % 60);
      const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${returnedMinutes}:${returnedSeconds}`;
    };

    const togglePlayPause = () => {
      const prevValue = isPlaying;
      setIsPlaying(!prevValue);
      if (!prevValue) {
        audioPlayer?.current?.play();
        setTempPause(false);
        animationRef.current = requestAnimationFrame(() => whilePlaying());
      } else {
        audioPlayer?.current?.pause();
        setTempPause(true);
        cancelAnimationFrame(animationRef.current as number);
      }
    };

    const whilePlaying = () => {
      if (audioPlayer?.current && progressBar?.current) {
        progressBar.current.value = (
          audioPlayer?.current?.currentTime ?? 0
        ).toString();
      }

      changePlayerCurrentTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
    };

    const changeRange = () => {
      if (audioPlayer?.current && progressBar?.current) {
        audioPlayer.current.currentTime = parseFloat(progressBar.current.value);
      }

      changePlayerCurrentTime();
    };

    const changePlayerCurrentTime = () => {
      const duration = audioPlayer?.current?.duration || 0;
      const currentTime = audioPlayer?.current?.currentTime || 0;
      progressBar?.current?.style.setProperty(
        '--movewidth',
        `${(currentTime / duration) * 100}%`,
      );
      setCurrentTime(currentTime);
    };

    return (
      <AudioCOntainer ref={ref} disabled={disabled as boolean}>
        <Audio ref={audioPlayer} src={audioLink} preload="metadata" />
        {isOwner ? (
          <>
            <PlayZone css={{ marginTop: '21px' }}>
              <span>{calculateTime(currentTime)}</span>
              <ProgressBar
                type="range"
                defaultValue="0"
                ref={progressBar}
                onChange={changeRange}
              />
              <span>
                {duration
                  ? isFinite(duration) &&
                    !isNaN(duration) &&
                    calculateTime(duration)
                  : '00:00'}
              </span>
            </PlayZone>
            <ButtonZone>
              <TrackControlZone>
                <AudioButton
                  variant="clear"
                  as="button"
                  disabled={disabled}
                  onClick={onhandleForward}
                  aria-label="앞으로 이동하기"
                >
                  <Left />
                </AudioButton>
                <AudioButton
                  variant="clear"
                  onClick={togglePlayPause}
                  as="button"
                  disabled={disabled}
                  aria-label={
                    isPlaying && !tempPause ? '일시정지하기' : '재생하기'
                  }
                >
                  {isPlaying && !tempPause ? (
                    <PauseIcon width="24" height="24" />
                  ) : (
                    <Play width="24" height="24" />
                  )}
                </AudioButton>
                <AudioButton
                  variant="clear"
                  as="button"
                  disabled={disabled}
                  onClick={onhandleBackward}
                  aria-label="뒤로 이동하기"
                >
                  <Right fill={theme.colors.gray_300} />
                </AudioButton>
              </TrackControlZone>
              <DownloadButton
                variant="clear"
                as="button"
                disabled={disabled}
                onClick={onhandleDownload}
                aria-label="다운로드하기"
              >
                <FileDownload />
              </DownloadButton>
            </ButtonZone>
          </>
        ) : (
          <>
            <PlayZone>
              <span>{calculateTime(currentTime)}</span>
              <ButtonZone isGuest={true}>
                <AudioButton
                  variant="clear"
                  onClick={togglePlayPause}
                  as="button"
                  aria-label={
                    isPlaying && !tempPause ? '일시정지하기' : '재생하기'
                  }
                >
                  {isPlaying && !tempPause ? (
                    <PauseIcon width="20" height="20" />
                  ) : (
                    <Play width="20" height="20" />
                  )}
                </AudioButton>
              </ButtonZone>
              <ProgressBar
                type="range"
                defaultValue="0"
                ref={progressBar}
                onChange={changeRange}
              />
              <span>
                {duration
                  ? isFinite(duration) &&
                    !isNaN(duration) &&
                    calculateTime(duration)
                  : '00:00'}
              </span>
            </PlayZone>
          </>
        )}
      </AudioCOntainer>
    );
  },
);

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer;
