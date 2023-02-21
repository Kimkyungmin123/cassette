import PauseIcon from '@icon/pause.svg';
import Play from '@icon/play.svg';
import { forwardRef, RefObject, useEffect, useRef, useState } from 'react';

import {
  Audio,
  AudioCOntainer,
  ButtonZone,
  PlaynPauseButton,
  PlayZone,
  ProgressBar,
} from './style';

interface AudioPlayerProps {
  audioLink: string;
  ref?: RefObject<HTMLDivElement>;
  isOwner?: boolean;
}

const AudioPlayer = ({ audioLink, ref, isOwner = true }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const audioPlayer = useRef<HTMLAudioElement>(null);
  const progressBar = useRef<HTMLInputElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const seconds = Math.floor(audioPlayer?.current?.duration || 0);

    setDuration(seconds);

    if (seconds !== Infinity)
      progressBar.current?.setAttribute('max', `${seconds}`);
  }, [
    audioPlayer?.current?.onloadedmetadata,
    audioPlayer?.current?.readyState,
  ]);

  const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer?.current?.play();
      animationRef.current = requestAnimationFrame(() => whilePlaying());
    } else {
      audioPlayer?.current?.pause();
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
    progressBar?.current?.style.setProperty(
      '--movewidth',
      `${(parseFloat(progressBar?.current?.value) / duration) * 100}%`,
    );
    setCurrentTime(parseFloat(progressBar?.current?.value ?? '0'));
  };

  return (
    <AudioCOntainer ref={ref}>
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
              {duration ? !isNaN(duration) && calculateTime(duration) : '00:00'}
            </span>
          </PlayZone>
          <ButtonZone>
            <PlaynPauseButton
              variant="clear"
              onClick={togglePlayPause}
              as="button"
            >
              {isPlaying && (currentTime === 0 || currentTime !== duration) ? (
                <PauseIcon width="24" height="24" />
              ) : (
                <Play width="24" height="24" />
              )}
            </PlaynPauseButton>
          </ButtonZone>
        </>
      ) : (
        <>
          <PlayZone>
            <span>{calculateTime(currentTime)}</span>
            <ButtonZone isGuest={true}>
              <PlaynPauseButton
                variant="clear"
                onClick={togglePlayPause}
                as="button"
              >
                {isPlaying &&
                (currentTime === 0 || currentTime !== duration) ? (
                  <PauseIcon width="20" height="20" />
                ) : (
                  <Play width="20" height="20" />
                )}
              </PlaynPauseButton>
            </ButtonZone>
            <ProgressBar
              type="range"
              defaultValue="0"
              ref={progressBar}
              onChange={changeRange}
            />
            <span>
              {duration ? !isNaN(duration) && calculateTime(duration) : '00:00'}
            </span>
          </PlayZone>
        </>
      )}
    </AudioCOntainer>
  );
};

export default forwardRef(AudioPlayer);
