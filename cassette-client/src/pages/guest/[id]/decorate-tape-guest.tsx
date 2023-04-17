import { ButtonLayout } from 'components/button/style';
import ColorPlate from 'components/colorPlate';
import SpinnerIcon, { SpinnerView } from 'components/spinner';
import TapeSVG from 'components/tape/tape';
import Title from 'components/title';
import useLoading from 'hooks/useLoading';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGuestInfoStore } from 'store';
import { DecoContainer, DecoZone, Middie } from 'styles/decorate-tape';
import theme from 'styles/theme';
import { Color } from 'types';

const DecorateTapeGuest = () => {
  const { query } = useRouter();
  const { userNickname, tapename, date, tapeColor, setTapeColor } =
    useGuestInfoStore();

  const { isLoading, setIsLoading } = useLoading();

  const [isWindow, setIsWindow] = useState<boolean>(false);

  const GUEST_MAKE_TRACK_URL = `/guest/${query.id}/make-track`;

  const router = useRouter();

  useEffect(() => {
    setIsWindow(true);
    setTapeColor('cassette_orange');
  }, [setTapeColor]);

  return (
    <>
      {isWindow ? (
        <DecoContainer color={tapeColor}>
          <DecoZone css={{ gap: '24px', marginTop: '93px' }}>
            <Title name={userNickname} color={theme.colors.white} />
            <TapeSVG title={tapename} date={date} sec="144" isOwner={false} />
            <DecoZone>
              <Middie>
                <label>
                  <p>
                    테이프{' '}
                    <span css={{ color: theme.colors[tapeColor as Color] }}>
                      안쪽 색상
                    </span>
                    를 골라주세요!
                  </p>
                  <ColorPlate isOwner={false} />
                </label>
              </Middie>
              <ButtonLayout
                variant="main"
                isLoading={isLoading}
                disabled={isLoading}
                aria-label="꾸미기 완료"
                onClick={() => {
                  setIsLoading(true);
                  router.push(GUEST_MAKE_TRACK_URL);
                }}
              >
                {isLoading ? <SpinnerIcon /> : <span> 꾸미기 완료</span>}
              </ButtonLayout>
            </DecoZone>
          </DecoZone>
        </DecoContainer>
      ) : (
        <SpinnerView />
      )}
    </>
  );
};

export default DecorateTapeGuest;
