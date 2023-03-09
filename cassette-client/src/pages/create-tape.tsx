import Input from 'components/input';
import TapeSVG from 'components/tape/tape';
import Title from 'components/title';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { useUserStore } from 'store';
import { Box, CreateTapeInfoButton, Info, InputBox } from 'styles/create-tape';

const MAX_LENGTH = {
  NICKNAME: 5,
  TITLE: 16,
};
const CreateTape = () => {
  const [nickname, setNickname] = useState('');
  const [title, setTitle] = useState('');
  const { setUserData, date } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    date ? router.push('/modify-tape-info') : null;
  }, [date]);

  const handleChangeNickname = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setNickname(target.value);
  };

  const handleChangeTitle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTitle(target.value);
  };

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
            nickname && title && setUserData(nickname, title);
          }}
          variant="main"
          disabled={!nickname || !title}
        >
          작성 완료
        </CreateTapeInfoButton>
      </Link>
    </Box>
  );
};

export default CreateTape;
