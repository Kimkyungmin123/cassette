import Button from 'components/button';
import MenuLayout from 'components/menu';
import Tape from 'components/tape';
import Title from 'components/title';
import useCopy from 'hooks/useCopy';
import { useEffect } from 'react';
import { useColorStore, useResponsUserStore, useUserStore } from 'store';
import theme from 'styles/theme';
import subInstance from 'utils/api/sub';

import { Box } from '../styles/create-tape';

const CreateTapeCompleted = () => {
  const { setResponsUser, userURL } = useResponsUserStore();
  const { userNickname, tapename, setUserData } = useUserStore();
  const { setTapeColor } = useColorStore();
  const [isCopied, onCopy] = useCopy();

  const handleCopyClipBoard = (text: string) => {
    onCopy(text);
  };

  const GUEST_URL = `${process.env.NEXT_PUBLIC_CLIENT_URL}/guest/${userURL}/guest-entry`;

  useEffect(() => {
    subInstance.getUserTape().then((data) => {
      setUserData(data?.result[0]['name'], data?.result[0]['title']);
      setResponsUser(data?.result[0]['tapeLink']);
      setTapeColor(data?.result[0]['colorCode']);
    });
  }, [setResponsUser, setUserData, setTapeColor]);

  return (
    <>
      <MenuLayout name={userNickname} />
      <div>
        <Box margin="0 0 24px 0">
          <Title name={userNickname} color={theme.colors.white} />
        </Box>
        <Box margin="0 0 44px 0">
          <Tape title={tapename} date="21.01.01" sec="144" />
        </Box>
        <Button
          variant="main"
          onClick={() => handleCopyClipBoard(`${GUEST_URL}`)}
        >
          친구들에게 목소리 남겨달라고 하기
        </Button>
        {isCopied ? <span>복사완료</span> : null}
      </div>
    </>
  );
};

export default CreateTapeCompleted;
