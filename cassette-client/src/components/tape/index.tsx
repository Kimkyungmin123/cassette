import RecordIcon from '@icon/record.svg';
import StopIcon from '@icon/stop.svg';
import useAudio from 'hooks/useAudio';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import { usePlayStore, useRecordStore } from 'store';

import {
  AlertBox,
  AudioContainer,
  ClearButton,
  RecordButtonZone,
  RecordingContainer,
  RecordingHeight,
  Time,
  TypeStyle,
} from './style';
import TapeSvg, { TapeSvgProps } from './tape';

interface TapeProps extends TapeSvgProps {
  hasAudio?: boolean;
  audioLink?: string;
  setAudio?: Dispatch<SetStateAction<Blob>>;
  isOwner?: boolean;
  firstEntry?: boolean;
  setFirstEntry?: Dispatch<SetStateAction<boolean>>;
  setIsRedording?: Dispatch<SetStateAction<boolean>>;
}

const AudioPlayer = dynamic(() => import('components/audio'));

const Tape = ({
  hasAudio,
  title,
  date,
  sec,
  width,
  color,
  height,
  audioLink,
  setAudio,
  isOwner = true,
  firstEntry,
  setFirstEntry,
  setIsRedording,
}: TapeProps) => {
  const { playing, toggle } = useAudio(audioLink ?? '');

  const recordRef = useRef<null | HTMLDivElement>(null);
  const [isRecorded, setIsRecorded] = useState(false);
  const [url, setUrl] = useState<string>('');
  const { isPlayAudio } = usePlayStore();
  const { setIsGlobalRecording } = useRecordStore();

  const {
    startRecording,
    stopRecording,
    recordingBlob,
    isRecording,
    recordingTime,
  } = useAudioRecorder();

  const addAudioFile = (blob: Blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    setUrl(url);
    setAudio?.(blob);
  };

  const handleClearRecording = () => {
    setUrl('');
    setIsRecorded(false);
  };

  useEffect(() => {
    if (!recordingBlob) return;
    addAudioFile(recordingBlob);
    setIsRecorded(true);
  }, [recordingBlob]);

  useEffect(() => {
    if (recordingTime === 12) {
      stopRecording();
      setIsRedording?.(false);
    }
  }, [recordingTime]);

  useEffect(() => {
    isRecording ? setIsGlobalRecording(true) : setIsGlobalRecording(false);
  }, [isRecording]);

  return (
    <TypeStyle>
      <TapeSvg
        title={title}
        date={date}
        sec={sec}
        width={width}
        height={height}
        color={color}
        isOwner={false}
        isPlaying={isPlayAudio && isRecorded}
      />
      {/* TODO: 추후에 연결할 것 */}
      {/* {audioLink && (
        <button onClick={() => toggle?.()}>{playing ? '정지' : '시작'}</button>
      )} */}

      {hasAudio && (
        <AudioContainer>
          <RecordButtonZone>
            {firstEntry ? (
              <>
                <Time css={{ marginBottom: '61px' }}>00:00</Time>
                <ClearButton
                  variant="clear"
                  onClick={() => {
                    handleClearRecording();
                    startRecording();
                    setFirstEntry?.(false);
                    setIsRedording?.(true);
                  }}
                  aria-label="녹음하기"
                >
                  <RecordIcon />
                </ClearButton>
              </>
            ) : (
              !isRecording && !isRecorded && <RecordingHeight></RecordingHeight>
            )}

            {isRecording ? (
              <>
                <Time>
                  {recordingTime < 10
                    ? `00:0${recordingTime}`
                    : `00:${recordingTime}`}
                </Time>
                <AlertBox isRecording={true}>
                  <div>최대 녹음 가능 시간은 12초에요!</div>
                </AlertBox>
                <ClearButton
                  variant="clear"
                  onClick={() => {
                    stopRecording();
                    setIsRedording?.(false);
                  }}
                  disabled={recordingTime < 3}
                  aria-label="녹음 중지하기"
                >
                  <StopIcon />
                </ClearButton>
              </>
            ) : null}
          </RecordButtonZone>

          {isRecorded ? (
            <>
              <RecordingContainer>
                <AudioPlayer
                  ref={recordRef}
                  audioLink={url}
                  isOwner={isOwner}
                />
              </RecordingContainer>
              <RecordButtonZone css={{ paddingBottom: '39px' }}>
                <ClearButton
                  variant="clear"
                  onClick={() => {
                    handleClearRecording();
                    startRecording();
                    setIsRedording?.(true);
                  }}
                  disabled={isRecording}
                  aria-label="재녹음하기"
                >
                  <RecordIcon />
                </ClearButton>
              </RecordButtonZone>
            </>
          ) : null}
        </AudioContainer>
      )}
    </TypeStyle>
  );
};

export default Tape;
