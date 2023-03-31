import Button from 'components/button';
import ColorPlate from 'components/colorPlate';
import TapeSVG from 'components/tape/tape';
import Title from 'components/title';
import useLoading from 'hooks/useLoading';
import { useRouter } from 'next/router';
import { useColorStore, useResponsUserStore, useUserStore } from 'store';
import { DecoContainer, DecoZone, Middie } from 'styles/decorate-tape';
import { Color } from 'types';
import subInstance from 'utils/api/sub';

import theme from '../styles/theme';

const DecorateTape = () => {
  const { tapeColor, setTapeColor } = useColorStore();
  const { userNickname, tapename, date } = useUserStore();
  const { setResponsUser } = useResponsUserStore();

  const { isLoading, setIsLoading } = useLoading();

  const router = useRouter();

  const submit = () => {
    setIsLoading(true);

    subInstance
      .createUserTape(tapeColor as Color, tapename, userNickname)
      .then((data) => {
        setResponsUser(data.result.tapeLink);
        setTapeColor(data.result.colorCode);
        router.push('/create-tape-completed');
        setIsLoading(false);
      })
      .catch(() => {
        alert(`테이프 생성 실패`);
        setIsLoading(false);
        router.push('/');
      });
  };

  return (
    <DecoContainer color={tapeColor as Color} css={{ padding: '0 24px' }}>
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
          <Button variant="main" onClick={submit} isLoading={isLoading}>
            <span>꾸미기 완료</span>
          </Button>
        </DecoZone>
      </DecoZone>
    </DecoContainer>
  );
};

export default DecorateTape;
