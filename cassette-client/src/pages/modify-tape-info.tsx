import { useQuery } from '@tanstack/react-query';
import { ButtonLayout } from 'components/button/style';
import Input from 'components/input';
import SpinnerIcon, { SpinnerView } from 'components/spinner';
import TapeSVG from 'components/tape/tape';
import { TitleName, TitleWrapper } from 'components/title/styles';
import { MAX_LENGTH } from 'constants/maxTextLen';
import useInput from 'hooks/useInput';
import useLoading from 'hooks/useLoading';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useColorStore, useResponsUserStore, useUserStore } from 'store';
import subInstance from 'utils/api/sub';
import date from 'utils/format/date';
import { withAuthServerSideProps } from 'utils/ssr/withAuth';
import { withPrefetchServerSideProps } from 'utils/ssr/withData';

import { Box, Info, InputBox } from '../styles/create-tape';

const MenuLayout = dynamic(() => import('components/menu'));

export const getServerSideProps = withAuthServerSideProps(() => {
  withPrefetchServerSideProps('tapeInfo', subInstance.getUserTape);
  return { props: {} };
});

const ModifyTapeInfo = () => {
  const { setUserData, userNickname } = useUserStore();
  const { setResponsUser } = useResponsUserStore();
  const { setTapeColor } = useColorStore();

  const { isLoading, setIsLoading } = useLoading();

  const {
    value: modifiedUserName,
    handleChangeValue: handleChangeNickname,
    setValue: setModifiedUserName,
  } = useInput(MAX_LENGTH.NICKNAME);

  const {
    value: modifiedTapeTitle,
    handleChangeValue: handleChangeTitle,
    setValue: setModifiedTapeTitle,
  } = useInput(MAX_LENGTH.TITLE);

  const router = useRouter();
  const { data: tapeInfo, isLoading: tapeInfoLoading } = useQuery(
    ['tapeData'],
    subInstance.getUserTape,
  );

  useEffect(() => {
    if (tapeInfo) {
      console.log(tapeInfo);
      setTapeColor(tapeInfo['colorCode']);
      setResponsUser(tapeInfo['tapeLink'], tapeInfo['id']);
      setModifiedUserName(tapeInfo['name']);
      setModifiedTapeTitle(tapeInfo['title']);
    }
  }, [tapeInfo]);

  if (tapeInfoLoading) {
    return <SpinnerView />;
  }

  return (
    <>
      {tapeInfo ? (
        <Box css={{ padding: '93px 24px 92px  24px' }}>
          <MenuLayout name={userNickname} />
          <Box margin="0 0 24px 0">
            <TitleWrapper>
              <TitleName color={'white'}>{tapeInfo['name']}</TitleName>&apos;s
              Tape
            </TitleWrapper>
          </Box>
          <Box margin="0 0 44px 0">
            <TapeSVG
              title={tapeInfo['title']}
              date={date.formattedDate(tapeInfo['createAt'])}
              sec="144"
              color={tapeInfo['colorCode']}
            />
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

          <ButtonLayout
            onClick={() => {
              setIsLoading(true);
              modifiedUserName &&
                modifiedTapeTitle &&
                setUserData(modifiedUserName, modifiedTapeTitle);
              router.push('/modify-decorate-tape');
            }}
            variant="main"
            aria-label="수정 완료"
            disabled={!modifiedUserName || !modifiedTapeTitle || isLoading}
            isLoading={isLoading}
          >
            {isLoading ? <SpinnerIcon /> : <span>수정 완료</span>}
          </ButtonLayout>
        </Box>
      ) : (
        () => router.push('/create-tape')
      )}
    </>
  );
};

export default ModifyTapeInfo;
