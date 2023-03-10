import Input from 'components/input';
import MenuLayout from 'components/menu';
import TapeSVG from 'components/tape/tape';
import { TitleName, TitleWrapper } from 'components/title/styles';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { useColorStore, useResponsUserStore, useUserStore } from 'store';
import subInstance from 'utils/api/sub';

import {
  Box,
  CreateTapeInfoButton,
  Info,
  InputBox,
} from '../styles/create-tape';

const MAX_LENGTH = {
  NICKNAME: 5,
  TITLE: 16,
};
const ModifyTapeInfo = () => {
  const [nickname, setNickname] = useState('');
  const [title, setTitle] = useState('');
  const { setUserData, userNickname, date } = useUserStore();
  const { setResponsUser } = useResponsUserStore();
  const { setTapeColor } = useColorStore();
  const [userName, setUserName] = useState<string>('');
  const [userTapeName, setUserTapeName] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    subInstance
      .getUserTape()
      .then((data) => {
        setUserName(data?.result?.slice(-1)[0]['name']);
        setUserTapeName(data?.result?.slice(-1)[0]['title']);
        setTapeColor(data?.result?.slice(-1)[0]['colorCode']);
        setResponsUser(
          data?.result?.slice(-1)[0]['tapeLink'],
          data?.result?.slice(-1)[0]['id'],
        );
      })
      .then(() => {
        !userNickname ? router.push('/create-tape') : null;
      })
      .catch(() => {
        router.push('/create-tape');
      });
    setNickname(userName);
    setTitle(userTapeName);
  }, [setResponsUser, setTapeColor, userName, userTapeName, userNickname]);

  const handleChangeNickname = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setNickname(target.value);
  };

  const handleChangeTitle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTitle(target.value);
  };

  return (
    <>
      <Box css={{ padding: '93px 24px 92px  24px' }}>
        <MenuLayout name={userNickname} />
        <Box margin="0 0 24px 0">
          <TitleWrapper>
            <TitleName color={'white'}>{userName}</TitleName>&apos;s Tape
          </TitleWrapper>
        </Box>
        <Box margin="0 0 44px 0">
          <TapeSVG title={userTapeName} date={date} sec="144" />
        </Box>
        <InputBox>
          <Input
            value={nickname}
            onChange={handleChangeNickname}
            label="????????? ???????????? ???????????? ???????????????."
            highlightWords={['?????????']}
            maxLength={MAX_LENGTH.NICKNAME}
          />
        </InputBox>

        <InputBox>
          <Input
            value={title}
            onChange={handleChangeTitle}
            label="???????????? ????????? ???????????????."
            highlightWords={['???????????? ??????']}
            maxLength={MAX_LENGTH.TITLE}
          />
          <Info>
            ??????????????? ?????? ????????? ????????????????
            <br />
            ex&#41; 2023??? ?????? ????????? ????????? ????????????!
          </Info>
        </InputBox>
        <Link href={nickname && title ? '/modify-decorate-tape' : '#'}>
          <CreateTapeInfoButton
            onClick={() => {
              nickname && title && setUserData(nickname, title);
            }}
            variant="main"
            disabled={!nickname || !title}
          >
            ?????? ??????
          </CreateTapeInfoButton>
        </Link>
      </Box>
    </>
  );
};

export default ModifyTapeInfo;
