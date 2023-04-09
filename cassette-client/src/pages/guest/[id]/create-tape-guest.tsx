import SpinnerIcon from 'components/button/spinner';
import { ButtonLayout } from 'components/button/style';
import Input from 'components/input';
import TapeSVG from 'components/tape/tape';
import Title from 'components/title';
import { MAX_LENGTH } from 'constants/maxTextLen';
import useInput from 'hooks/useInput';
import useLoading from 'hooks/useLoading';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useGuestInfoStore } from 'store';
import { Box, Info, InputBox } from 'styles/create-tape';
import date from 'utils/format/date';

const CreateTapeGuest = () => {
  const { query } = useRouter();
  const [trackDate, setTrackDate] = useState('');

  const { setUserData, setDate } = useGuestInfoStore();
  const { isLoading, setIsLoading } = useLoading();

  const { value: nickname, handleChangeValue: handleChangeNickname } = useInput(
    MAX_LENGTH.NICKNAME,
  );
  const { value: title, handleChangeValue: handleChangeTitle } = useInput(
    MAX_LENGTH.TITLE,
  );

  const GUEST_DECORATE_TAPE_URL = `/guest/${query.id}/decorate-tape-guest`;

  const router = useRouter();

  useEffect(() => {
    const createTrackDate = new Date();
    setTrackDate(date.formattedCreateDate(createTrackDate));
    setDate(date.formattedCreateDate(createTrackDate));
  }, [setDate]);

  return (
    <Box css={{ padding: '93px 24px 92px 24px ' }}>
      <Box margin="0 0 24px 0">
        <Title name="닉네임" />
      </Box>
      <Box margin="0 0 44px 0">
        <TapeSVG
          title="테이프의 제목이 여기에 적혀요!"
          date={trackDate}
          sec="144"
          isOwner={false}
          color="cassette_orange"
        />
      </Box>
      <InputBox>
        <Input
          value={nickname}
          onChange={handleChangeNickname}
          label="게스트의 닉네임을 적어주세요."
          highlightWords={['닉네임']}
          placeholder="닉네임을 적어주세요."
          maxLength={MAX_LENGTH.NICKNAME}
          aria-label="생성할 닉네임 입력칸"
        />
      </InputBox>

      <InputBox>
        <Input
          value={title}
          onChange={handleChangeTitle}
          label="테이프의 제목을 적어주세요."
          highlightWords={['테이프의 제목']}
          placeholder="테이프의 제목을 적어주세요."
          maxLength={MAX_LENGTH.TITLE}
          aria-label="생성할 테이프 제목 입력칸"
        />
        <Info>
          친구에게 어떤 얘기를 해주고 싶나요?
          <br />
          ex&#41; 친구야 사랑해!
        </Info>
      </InputBox>

      <ButtonLayout
        onClick={() => {
          setUserData(nickname, title);
          setIsLoading(true);
          router.push(GUEST_DECORATE_TAPE_URL);
        }}
        variant="main"
        disabled={!nickname || !title || isLoading}
        isLoading={isLoading}
        aria-label="작성 완료"
      >
        {isLoading ? <SpinnerIcon /> : <span> 작성 완료</span>}
      </ButtonLayout>
    </Box>
  );
};

export default CreateTapeGuest;
