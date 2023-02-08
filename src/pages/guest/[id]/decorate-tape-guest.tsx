import Button from 'components/button';
import ColorPlate from 'components/colorPlate';
import TapeSVG from 'components/tape/tape';
import Link from 'next/link';
import { useGuestColorStore, useGuestInfoStore } from 'store';
import { DecoContainer, DecoZone } from 'styles/decorate-tape';

const DecorateTapeGuest = () => {
  const { userNickname, tapename } = useGuestInfoStore();

  const guestColor = useGuestColorStore().tapeColor;

  return (
    <DecoContainer color={guestColor}>
      <DecoZone css={{ gap: '24px' }}>
        <h3>{userNickname}&apos;s Tape</h3>
        <TapeSVG title={tapename} date="21.01.01" sec="144" isOwner={false} />
        <DecoZone css={{ gap: '136px' }}>
          <div>
            <p>
              테이프 <span>안쪽 색상</span>를 골라주세요!
            </p>
            <ColorPlate isOwner={false} />
          </div>
          <Link href="create-tape-completed">
            <Button variant="main">꾸미기 완료</Button>
          </Link>
        </DecoZone>
      </DecoZone>
    </DecoContainer>
  );
};

export default DecorateTapeGuest;
