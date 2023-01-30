import Button from 'components/button';
import Tape from 'components/tape';
import Title from 'components/title';
import ToastUI from 'components/Toast';
import useCopy from 'hooks/useCopy';
import { useEffect, useState } from 'react';
import { useColorStore, useResponsUserStore, useUserStore } from 'store';
import theme from 'styles/theme';
import subInstance from 'utils/api/sub';

import Completed from '../../public/assets/completed.svg';
import Copy from '../../public/assets/copy.svg';
import { BottomZone, Box, TosatZone } from '../styles/create-tape';

const CreateTapeCompleted = () => {
  const { setResponsUser, userURL } = useResponsUserStore();
  const { userNickname, tapename, setUserData } = useUserStore();
  const { setTapeColor } = useColorStore();
  const [isCopied, onCopy] = useCopy();
  const [onToast, setOnToast] = useState<boolean>(true);

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

  // TODO: server, client tape fill 매치되지 않는 에러 해결하기
  return (
    <div>
      <Box margin="0 0 24px 0">
        <Title name={userNickname} color={theme.colors.white} />
      </Box>
      <Box margin="0 0 44px 0">
        <Tape title={tapename} date="21.01.01" sec="144" />
      </Box>
      <BottomZone>
        <Button
          variant="main"
          onClick={() => {
            handleCopyClipBoard(`${GUEST_URL}`);
            setOnToast(true);
          }}
        >
          <Copy />내 테이프 공유하기
        </Button>
        {isCopied && onToast ? (
          <TosatZone>
            <ToastUI onClose={setOnToast}>
              <Completed />내 테이프 링크를 복사했어요!
            </ToastUI>
          </TosatZone>
        ) : null}
      </BottomZone>
    </div>
  );
};

export default CreateTapeCompleted;
