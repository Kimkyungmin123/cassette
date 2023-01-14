import Button from 'components/button';
import ColorPlate from 'components/colorPlate';
import Tape from 'components/tape';
import { useStore } from 'store';
import { DecoContainer, DecoZone } from 'styles/decorate-tape';
import { Color } from 'types';

export interface decorateTapeProps {
  color: Color;
}

const decorateTape = () => {
  const { tapeColor } = useStore();

  return (
    <DecoContainer color={tapeColor}>
      <DecoZone css={{ gap: '24px' }}>
        <h3>벨라&apos;s Tape</h3>
        <Tape title="2023 한정판 테이프" date="21.01.01" sec="144" />
        <DecoZone css={{ gap: '136px' }}>
          <div>
            <p>
              테이프 <span>안쪽 색상</span>를 골라주세요!
            </p>
            <ColorPlate />
          </div>
          <Button variant="main">꾸미기 완료</Button>
        </DecoZone>
      </DecoZone>
    </DecoContainer>
  );
};

export default decorateTape;
