import Close from '@icon/close.svg';
import CheckBox from 'components/checkBox';
import Dropdown from 'components/dropDown';
import SpinnerIcon from 'components/spinner';
import TapeSvg from 'components/tape/tape';
import Textarea from 'components/textarea';
import { WITHDRAWAL } from 'constants/withdrawal';
import useLoading from 'hooks/useLoading';
import { NextConfig } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { dropdownStore, useUserStore } from 'store';
import {
  CloseZone,
  SubmitZone,
  SubText,
  Title,
  WithdrawalButton,
  WithdrawalContainer,
  WithdrawalContent,
} from 'styles/withdrawal';
import { WithdrawalType } from 'types';
import mainInstance from 'utils/api/main';
import { removeAuthToken } from 'utils/storage/authCookie';

export const getServerSideProps = (context: NextConfig) => {
  const { accessToken } = context.req.cookies;

  if (!accessToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return { props: {} };
};

const Withdrawal = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean>(false);
  const [opinion, setOpinion] = useState<string>('');

  const router = useRouter();

  const { userNickname } = useUserStore();
  const { dropContent, dropType, setDropData } = dropdownStore();

  const { isLoading, setIsLoading } = useLoading();

  const handleChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleChangeNickname = ({
    target,
  }: ChangeEvent<HTMLTextAreaElement>) => {
    setOpinion(target.value);
  };

  const submit = () => {
    setIsLoading(true);

    mainInstance.deleteUser(dropType as WithdrawalType, opinion).then(() => {
      window.localStorage.removeItem('persist');
      removeAuthToken('accessToken');
      router.push('/');
    });
  };

  return (
    <WithdrawalContainer>
      <CloseZone>
        <Close
          onClick={() => {
            router.back();
            setSelected(false);
            setChecked(false);
            setOpinion('');
            setDropData('');
          }}
        />
      </CloseZone>
      <Title>
        <TapeSvg width="27px" height="25px" title="" date="" />
        <h1>Voice Tape 탈퇴하기</h1>
      </Title>

      <SubText>
        <h2>
          {userNickname}님! Voice Tape를 <span>탈퇴</span>
          하시나요? <br />
          탈퇴시 모든 Tape는 사라져요.
        </h2>
      </SubText>

      <WithdrawalContent>
        <h2>떠나시는 이유를 말씀해주세요.</h2>
        <Dropdown
          defaultText="선택해주세요"
          onClick={() => setSelected(false)}
          selected={selected}
          onSelected={() => setSelected(true)}
          dropData={WITHDRAWAL}
        />

        <Textarea
          placeholder={'더 나은 Voice Tape를 위해 의견을 보내주세요 \n(선택) '}
          maxLength={400}
          onChange={handleChangeNickname}
          value={opinion}
        />
      </WithdrawalContent>
      <SubmitZone>
        <CheckBox
          isChecked={checked}
          onChange={handleChangeCheck}
          id="deleteData"
        >
          <span>모든 데이터를 삭제하는 것에 동의합니다.</span>
        </CheckBox>

        <WithdrawalButton
          variant="main"
          disabled={!checked || !dropContent}
          aria-label="탈퇴하기"
          onClick={submit}
          isLoading={isLoading}
        >
          {isLoading ? <SpinnerIcon /> : <span>탈퇴하기</span>}
        </WithdrawalButton>
      </SubmitZone>
    </WithdrawalContainer>
  );
};

export default Withdrawal;
