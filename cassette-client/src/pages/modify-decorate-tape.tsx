import { ButtonLayout } from 'components/button/style';
import ColorPlate from 'components/colorPlate';
import SpinnerIcon from 'components/spinner';
import TapeSVG from 'components/tape/tape';
import Title from 'components/title';
import useLoading from 'hooks/useLoading';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useColorStore, useResponsUserStore, useUserStore } from 'store';
import { DecoContainer, DecoZone, Middie } from 'styles/decorate-tape';
import theme from 'styles/theme';
import { Color } from 'types';
import subInstance from 'utils/api/sub';
import { withAuthServerSideProps } from 'utils/ssr/withAuth';

const MenuLayout = dynamic(() => import('components/menu'));

export const getServerSideProps = withAuthServerSideProps(() => {
  return {
    props: {},
  };
});

const ModifyDecorateTape = () => {
  const { tapeColor, setTapeColor } = useColorStore();
  const { userNickname, tapename, date } = useUserStore();
  const { tapeId } = useResponsUserStore();

  const { isLoading, setIsLoading } = useLoading();

  const router = useRouter();

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
      <MenuLayout name={userNickname} />
      <DecoContainer color={tapeColor as Color}>
        <DecoZone css={{ gap: '24px', marginTop: '93px' }}>
          <Title name={userNickname} color={theme.colors.white} />
          <TapeSVG title={tapename} date={date} sec="144" />
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
  );
};

export default ModifyDecorateTape;
