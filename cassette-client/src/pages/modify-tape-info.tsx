import Input from 'components/input';
import TapeSVG from 'components/tape/tape';
import { TitleName, TitleWrapper } from 'components/title/styles';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { useColorStore, useResponsUserStore, useUserStore } from 'store';
import subInstance from 'utils/api/sub';
import date from 'utils/format/date';

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
  const [modifiedUserName, setModifiedUserName] = useState('');
  const [modifiedTapeTitle, setModifiedTapeTitle] = useState('');
  const { setUserData, userNickname } = useUserStore();
  const { setResponsUser } = useResponsUserStore();
  const { setTapeColor } = useColorStore();
  const [userName, setUserName] = useState<string>('');
  const [userTapeTitle, setUserTapeTitle] = useState<string>('');
  const [createDate, setCreateDate] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    subInstance
      .getUserTape()
      .then((data) => {
        const userData = data?.result?.slice(-1)[0];
        !userData
          ? router.push('/create-tape')
          : (setUserName(userData['name']),
            setUserTapeTitle(userData['title']),
            setTapeColor(userData['colorCode']),
            setResponsUser(userData['tapeLink'], userData['id']),
            setCreateDate(date.formattedDate(userData['createAt'])));
      })
      .catch(() => {
        router.push('/create-tape');
      });
    setModifiedUserName(userName);
    setModifiedTapeTitle(userTapeTitle);
  }, [setResponsUser, setTapeColor, userName, userTapeTitle, userNickname]);

  const handleChangeNickname = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setModifiedUserName(target.value);
  };

  const handleChangeTitle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setModifiedTapeTitle(target.value);
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
          <TapeSVG title={userTapeTitle} date={createDate} sec="144" />
        </Box>
        <InputBox>
          <Input
            value={modifiedUserName}
            onChange={handleChangeNickname}
            label="카세트 주인장의 닉네임을 적어주세요."
            highlightWords={['닉네임']}
            maxLength={MAX_LENGTH.NICKNAME}
            aria-label="수정할 닉네임 입력칸"
          />
        </InputBox>

        <InputBox>
          <Input
            value={modifiedTapeTitle}
            onChange={handleChangeTitle}
            label="테이프의 제목을 적어주세요."
            highlightWords={['테이프의 제목']}
            maxLength={MAX_LENGTH.TITLE}
            aria-label="수정할 테이프 제목 입력칸"
          />
          <Info>
            친구들에게 어떤 얘기를 듣고싶나요?
            <br />
            ex&#41; 2023년 나의 새로운 도전을 응원해줘!
          </Info>
        </InputBox>
        <Link
          href={
            modifiedUserName && modifiedTapeTitle
              ? '/modify-decorate-tape'
              : '#'
          }
        >
          <CreateTapeInfoButton
            onClick={() => {
              modifiedUserName &&
                modifiedTapeTitle &&
                setUserData(modifiedUserName, modifiedTapeTitle);
            }}
            variant="main"
            disabled={!modifiedUserName || !modifiedTapeTitle}
          >
            수정 완료
          </CreateTapeInfoButton>
        </Link>
      </Box>
    </>
  );
};

export default ModifyTapeInfo;
