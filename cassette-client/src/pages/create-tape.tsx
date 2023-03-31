import SpinnerIcon from 'components/button/spinner';
import Input from 'components/input';
import TapeSVG from 'components/tape/tape';
import Title from 'components/title';
import { MAX_LENGTH } from 'constants/maxTextLen';
import useInput from 'hooks/useInput';
import useLoading from 'hooks/useLoading';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserStore } from 'store';
import { Box, CreateTapeInfoButton, Info, InputBox } from 'styles/create-tape';

const CreateTape = () => {
  const { setUserData, date } = useUserStore();

  const { value: nickname, handleChangeValue: handleChangeNickname } = useInput(
    MAX_LENGTH.NICKNAME,
  );
  const { value: title, handleChangeValue: handleChangeTitle } = useInput(
    MAX_LENGTH.TITLE,
  );
  const { isLoading, setIsLoading } = useLoading();

  const router = useRouter();

  useEffect(() => {
    date ? router.push('/modify-tape-info') : null;
  }, [date]);

  return (
    <Box css={{ padding: '93px 24px 92px 24px ' }}>
      <Box margin="0 0 24px 0">
        <Title name="닉네임" />
      </Box>
      <Box margin="0 0 44px 0">
        <TapeSVG title="테이프의 제목이 여기에 적혀요!" date={date} sec="144" />
      </Box>
      <InputBox>
        <Input
          value={nickname}
          onChange={handleChangeNickname}
          label="카세트 주인장의 닉네임을 적어주세요."
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
          친구들에게 어떤 얘기를 듣고싶나요?
          <br />
          ex&#41; 2023년 나의 새로운 도전을 응원해줘!
        </Info>
      </InputBox>
      <Link href={nickname && title ? '/decorate-tape' : '#'}>
        <CreateTapeInfoButton
          onClick={() => {
            setIsLoading(true);
            nickname && title && setUserData(nickname, title);
          }}
          variant="main"
          disabled={!nickname || !title}
          isLoading={isLoading}
        >
          {isLoading ? <SpinnerIcon /> : <>작성 완료</>}
        </CreateTapeInfoButton>
      </Link>
    </Box>
  );
};

export default CreateTape;
