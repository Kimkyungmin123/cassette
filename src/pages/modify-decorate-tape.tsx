import Button from 'components/button';
import ColorPlate from 'components/colorPlate';
import MenuLayout from 'components/menu';
import Tape from 'components/tape';
import Link from 'next/link';
import { useColorStore, useResponsUserStore, useUserStore } from 'store';
import { DecoContainer, DecoZone } from 'styles/decorate-tape';
import subInstance from 'utils/api/sub';

const ModifyDecorateTape = () => {
  const { tapeColor, setTapeColor } = useColorStore();
  const { userNickname, tapename } = useUserStore();
  const { tapeId } = useResponsUserStore();

  const submit = () => {
    subInstance
      .modifyUseTape(tapeId as number, tapeColor, tapename, userNickname)
      .then((data) => {
        setTapeColor(data.result.colorCode);
      });
  };

  return (
    <>
      <MenuLayout name={userNickname} />
      <DecoContainer color={tapeColor}>
        <DecoZone css={{ gap: '24px' }}>
          <h3>{userNickname}&apos;s Tape</h3>
          <Tape title={tapename} date="21.01.01" sec="144" />
          <DecoZone css={{ gap: '136px' }}>
            <div>
              <p>
                테이프 <span>안쪽 색상</span>를 골라주세요!
              </p>
              <ColorPlate />
            </div>
            <Link href="create-tape-completed">
              <Button variant="main" onClick={() => submit()}>
                꾸미기 완료
              </Button>
            </Link>
          </DecoZone>
        </DecoZone>
      </DecoContainer>
    </>
  );
};

export default ModifyDecorateTape;
