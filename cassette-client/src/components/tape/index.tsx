import { Icon } from '@iconify/react';
import AudioPlayer from 'components/audio';
import useAudio from 'hooks/useAudio';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useAudioRecorder } from 'react-audio-voice-recorder';

import {
  AlertBox,
  AudioContainer,
  ClearButton,
  RecordButtonZone,
  RecordingContainer,
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
    if (Math.ceil(recordingTime) === 12) {
      console.log(recordingTime, Math.ceil(recordingTime));
      stopRecording();
      setIsRedording?.(false);
    }
  }, [recordingTime]);

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
                  as="button"
                  aria-label="녹음하기"
                >
                  <Icon
                    icon="uim:record-audio"
                    color={'#CD0E00'}
                    width="35px"
                  />
                </ClearButton>
              </>
            ) : null}

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
                  as="button"
                  aria-label="녹음 중지하기"
                >
                  <Icon
                    icon="material-symbols:stop-circle-rounded"
                    color="white"
                    width="35px"
                  />
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
                  as="button"
                  aria-label="재녹음하기"
                >
                  <Icon
                    icon="uim:record-audio"
                    color={'#CD0E00'}
                    width="35px"
                  />
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
