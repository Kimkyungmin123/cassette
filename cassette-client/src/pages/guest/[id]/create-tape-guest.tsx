import Input from 'components/input';
import TapeSVG from 'components/tape/tape';
import Title from 'components/title';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { useGuestInfoStore } from 'store';
import { Box, CreateTapeInfoButton, Info, InputBox } from 'styles/create-tape';

const MAX_LENGTH = {
  NICKNAME: 5,
  TITLE: 16,
};

const CreateTapeGuest = () => {
  const { query } = useRouter();
  const [nickname, setNickname] = useState('');
  const [title, setTitle] = useState('');
  const { setUserData, setDate } = useGuestInfoStore();
  const [trackDate, setTrackDate] = useState('');

  const handleChangeNickname = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setNickname(target.value);
  };

  const handleChangeTitle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTitle(target.value);
  };

  const GUEST_DECORATE_TAPE_URL = `/guest/${query.id}/decorate-tape-guest`;

  useEffect(() => {
    const createTrackDate = new Date();
    setTrackDate(
      createTrackDate.toLocaleDateString().slice(2).split(' ').join(''),
    );
    setDate(createTrackDate.toLocaleDateString().slice(2).split(' ').join(''));
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
          친구에게 어떤 얘기를 해주고 싶나요?
          <br />
          ex&#41; 친구야 사랑해!
        </Info>
      </InputBox>
      <Link href={nickname && title ? GUEST_DECORATE_TAPE_URL : '#'}>
        <CreateTapeInfoButton
          onClick={() => {
            setUserData(nickname, title);
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

export default CreateTapeGuest;
