import { Icon } from '@iconify/react';
import useAudio from 'hooks/useAudio';
import { Dispatch, useEffect, useRef, useState } from 'react';
import { useAudioRecorder } from 'react-audio-voice-recorder';

import {
  AudioContainer,
  ClearButton,
  RecordContainer,
  RecordingContainer,
  Time,
  TypeStyle,
} from './style';
import TapeSvg, { TapeSvgProps } from './tape';

interface TapeProps extends TapeSvgProps {
  hasAudio?: boolean;
  audioLink?: string;
  setAudio?: Dispatch<any>;
}

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
}: TapeProps) => {
  const { playing, toggle } = useAudio(audioLink ?? '');

  const recordRef = useRef<null | HTMLDivElement>(null);
  const [isRecorded, setIsRecorded] = useState(false);
  const {
    startRecording,
    stopRecording,
    recordingBlob,
    isRecording,
    recordingTime,
  } = useAudioRecorder();

  const addAudioElement = (blob: any) => {
    if (typeof window !== 'object') return;
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    audio.src = url;
    audio.controls = true;

    if (!recordRef.current) return;
    if (recordRef.current.querySelector('audio')) return;

    setAudio?.(blob);

    recordRef.current?.appendChild(audio);
  };

  const handleClearRecording = () => {
    const audio = recordRef.current?.querySelector('audio');

    if (!audio) {
      stopRecording();
      return;
    }
    recordRef.current?.removeChild(audio);
    setIsRecorded(false);
  };

  useEffect(() => {
    if (!recordingBlob) return;
    addAudioElement(recordingBlob);
    setIsRecorded(true);
  }, [recordingBlob]);

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
      />

      {audioLink && (
        <button onClick={() => toggle?.()}>{playing ? '정지' : '시작'}</button>
      )}

      {hasAudio && (
        <AudioContainer>
          {isRecording ? (
            <>
              <ClearButton onClick={stopRecording}>
                <Icon
                  icon="material-symbols:stop-circle-rounded"
                  color="white"
                  width="32px"
                />
              </ClearButton>
            </>
          ) : (
            <ClearButton onClick={startRecording} disabled={isRecorded}>
              <Icon
                icon="uim:record-audio"
                color={isRecorded ? '#840000' : '#CD0E00'}
                width="32px"
              />
            </ClearButton>
          )}
          {isRecorded && (
            <ClearButton onClick={handleClearRecording} disabled={isRecording}>
              재녹음하기
            </ClearButton>
          )}
          <Time>
            {recordingTime < 10 ? `0${recordingTime}` : recordingTime}:00
          </Time>

          <RecordingContainer>
            <RecordContainer ref={recordRef} />
          </RecordingContainer>
        </AudioContainer>
      )}
    </TypeStyle>
  );
};

export default Tape;
