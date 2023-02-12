import Button from 'components/button';
import ColorPlate from 'components/colorPlate';
import TapeSVG from 'components/tape/tape';
import Link from 'next/link';
import { useEffect } from 'react';
import {
  useGuestColorStore,
  useGuestInfoStore,
  useGuestResponsStore,
} from 'store';
import { DecoContainer, DecoZone, Middie } from 'styles/decorate-tape';
import theme from 'styles/theme';

const DecorateTapeGuest = () => {
  const { userNickname, tapename, date } = useGuestInfoStore();

  const guestColor = useGuestColorStore().tapeColor;
  const setGuestColor = useGuestColorStore().setTapeColor;
  const { userURL } = useGuestResponsStore();

  const GUEST_MAKE_TRACK_URL = `/guest/${userURL}/make-track`;

  useEffect(() => {
    setGuestColor('cassette_orange');
  }, []);

  return (
    <DecoContainer color={guestColor} css={{ padding: '0 24px' }}>
      <DecoZone css={{ gap: '24px', paddingTop: '113px' }}>
        <h3>{userNickname}&apos;s Tape</h3>
        <TapeSVG title={tapename} date={date} sec="144" isOwner={false} />
        <DecoZone>
          <Middie>
            <div>
              <p>
                테이프{' '}
                <span css={{ color: theme.colors[guestColor] }}>안쪽 색상</span>
                를 골라주세요!
              </p>
              <ColorPlate isOwner={false} />
            </div>
          </Middie>
          <Link href={GUEST_MAKE_TRACK_URL}>
            <Button variant="main">꾸미기 완료</Button>
          </Link>
        </DecoZone>
      </DecoZone>
    </DecoContainer>
  );
};

export default DecorateTapeGuest;
