import Input from 'components/input';
import TapeSVG from 'components/tape/tape';
import { TitleName, TitleWrapper } from 'components/title/styles';
import dynamic from 'next/dynamic';
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

const MenuLayout = dynamic(() => import('components/menu'));

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
        const userData = data?.result?.slice(-1)[0];
        setUserName(userData['name']);
        setUserTapeName(userData['title']);
        setTapeColor(userData['colorCode']);
        setResponsUser(userData['tapeLink'], userData['id']);
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
            label="카세트 주인장의 닉네임을 적어주세요."
            highlightWords={['닉네임']}
            maxLength={MAX_LENGTH.NICKNAME}
          />
        </InputBox>

        <InputBox>
          <Input
            value={title}
            onChange={handleChangeTitle}
            label="테이프의 제목을 적어주세요."
            highlightWords={['테이프의 제목']}
            maxLength={MAX_LENGTH.TITLE}
          />
          <Info>
            친구들에게 어떤 얘기를 듣고싶나요?
            <br />
            ex&#41; 2023년 나의 새로운 도전을 응원해줘!
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
            수정 완료
          </CreateTapeInfoButton>
        </Link>
      </Box>
    </>
  );
};

export default ModifyTapeInfo;
