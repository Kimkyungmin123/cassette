import { ButtonLayout } from 'components/button/style';
import ColorPlate from 'components/colorPlate';
import MenuLayout from 'components/menu';
import SpinnerIcon, { SpinnerView } from 'components/spinner';
import TapeSVG from 'components/tape/tape';
import Title from 'components/title';
import useLoading from 'hooks/useLoading';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUserStore } from 'store';
import { DecoContainer, DecoZone, Middie } from 'styles/decorate-tape';
import theme from 'styles/theme';
import { Color } from 'types';
import subInstance from 'utils/api/sub';
import { withAuthServerSideProps } from 'utils/ssr/withAuth';

export const getServerSideProps = withAuthServerSideProps(() => {
  return {
    props: {},
  };
});

const ModifyDecorateTape = () => {
  const { userNickname, tapename, date, tapeColor, setTapeColor, tapeId } =
    useUserStore();
  const [isWindow, setIsWindow] = useState<boolean>(false);

  const { isLoading, setIsLoading } = useLoading();

  const router = useRouter();

  useEffect(() => {
    setIsWindow(true);
  }, []);

  const submit = () => {
    setIsLoading(true);

    subInstance
      .modifyUseTape(
        tapeId as number,
        tapeColor as Color,
        tapename,
        userNickname,
      )
      .then((data) => {
        setTapeColor(data.result.colorCode);
        router.push('/create-tape-completed');
      });
  };

  return (
    <>
      {isWindow ? (
        <>
          <MenuLayout name={userNickname} />
          <DecoContainer color={tapeColor as Color}>
            <DecoZone css={{ gap: '24px', marginTop: '93px' }}>
              <Title name={userNickname} color={theme.colors.white} />
              <TapeSVG
                title={tapename}
                date={date}
                sec="144"
                color={tapeColor as Color}
              />
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
                    <ColorPlate />
                  </label>
                </Middie>
                <ButtonLayout
                  variant="main"
                  onClick={submit}
                  isLoading={isLoading}
                  aria-label="꾸미기 완료"
                  disabled={isLoading}
                >
                  {isLoading ? <SpinnerIcon /> : <span>꾸미기 완료</span>}
                </ButtonLayout>
              </DecoZone>
            </DecoZone>
          </DecoContainer>
        </>
      ) : (
        <SpinnerView />
      )}
    </>
  );
};

export default ModifyDecorateTape;
