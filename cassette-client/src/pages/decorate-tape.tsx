import Button from 'components/button';
import ColorPlate from 'components/colorPlate';
import TapeSVG from 'components/tape/tape';
import Title from 'components/title';
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
  const router = useRouter();

  const submit = () => {
    subInstance
      .createUserTape(tapeColor as Color, tapename, userNickname)
      .then((data) => {
        setResponsUser(data.result.tapeLink);
        setTapeColor(data.result.colorCode);
        router.push('/create-tape-completed');
      });
  };

  return (
    <DecoContainer color={tapeColor as Color} css={{ padding: '0 24px' }}>
      <DecoZone css={{ gap: '24px', marginTop: '93px' }}>
        <Title name={userNickname} color={theme.colors.white} />
        <TapeSVG title={tapename} date={date} sec="144" />
        <DecoZone>
          <Middie>
            <div>
              <p>
                테이프{' '}
                <span css={{ color: theme.colors[tapeColor as Color] }}>
                  안쪽 색상
                </span>
                를 골라주세요!
              </p>
              <ColorPlate />
            </div>
          </Middie>
          <Button variant="main" onClick={() => submit()}>
            <span>꾸미기 완료</span>
          </Button>
        </DecoZone>
      </DecoZone>
    </DecoContainer>
  );
};

export default DecorateTape;
