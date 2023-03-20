import Button from 'components/button';
import ColorPlate from 'components/colorPlate';
import TapeSVG from 'components/tape/tape';
import Title from 'components/title';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useGuestColorStore, useGuestInfoStore } from 'store';
import { DecoContainer, DecoZone, Middie } from 'styles/decorate-tape';
import theme from 'styles/theme';
import { Color } from 'types';

const DecorateTapeGuest = () => {
  const { query } = useRouter();
  const { userNickname, tapename, date } = useGuestInfoStore();

  const guestColor = useGuestColorStore().tapeColor;
  const setGuestColor = useGuestColorStore().setTapeColor;

  const GUEST_MAKE_TRACK_URL = `/guest/${query.id}/make-track`;

  useEffect(() => {
    setGuestColor('cassette_orange');
  }, []);

  return (
    <DecoContainer color={guestColor}>
      <DecoZone css={{ gap: '24px', marginTop: '93px' }}>
        <Title name={userNickname} color={theme.colors.white} />
        <TapeSVG title={tapename} date={date} sec="144" isOwner={false} />
        <DecoZone>
          <Middie>
            <label>
              <p>
                테이프{' '}
                <span css={{ color: theme.colors[guestColor as Color] }}>
                  안쪽 색상
                </span>
                를 골라주세요!
              </p>
              <ColorPlate isOwner={false} />
            </label>
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
