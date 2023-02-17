import { Icon } from '@iconify/react';
import AudioPlayer from 'components/audio';
import useAudio from 'hooks/useAudio';
import { Dispatch, useEffect, useRef, useState } from 'react';
import { useAudioRecorder } from 'react-audio-voice-recorder';

import {
  AudioContainer,
  ClearButton,
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
  const [url, setUrl] = useState<string>('');
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

    if (!recordRef.current) return;
    if (recordRef.current.querySelector('audio')) return;

    setAudio?.(blob);

    console.log('recordRef', recordRef);
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
    if (!recordRef.current) return;
    if (recordRef.current.querySelector('audio')) return;
  }, [recordRef]);

  useEffect(() => {
    if (!recordingBlob) return;
    addAudioFile(recordingBlob);
    setIsRecorded(true);
  }, [recordingBlob]);

  useEffect(() => {
    if (recordingTime > 12) {
      stopRecording();
      setIsRecorded(false);
    }

    console.log(recordingTime);
  }, [recordingTime, setIsRecorded]);

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
              <ClearButton onClick={stopRecording} disabled={recordingTime < 3}>
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
            {recordingTime < 10
              ? `00:0${recordingTime}`
              : `00:${recordingTime}`}
          </Time>

          <RecordingContainer>
            {<AudioPlayer ref={recordRef} audioLink={url} />}
          </RecordingContainer>
        </AudioContainer>
      )}
    </TypeStyle>
  );
};

export default Tape;
