import Close from '@icon/close.svg';
import Document from '@icon/document.svg';
import DownLoad from '@icon/download.svg';
import KakaoLogin from '@icon/kakaoLogin.svg';
import Logout from '@icon/logout.svg';
import Setting from '@icon/setting.svg';
import Withdrawal from '@icon/withdrawal.svg';
import { ButtonLayout } from 'components/button/style';
import Link from 'next/link';
import { useRouter } from 'next/router';
import mainInstance from 'utils/api/main';
import { removeAuthToken } from 'utils/storage/authCookie';

import {
  Bar,
  Bottom,
  List,
  LoginStatus,
  LogoutLi,
  NavContainer,
} from './style';

export interface NavBarProps {
  name: string;
  isOpen: () => void;
  status: string | null;
}

const NavBar = ({ name, isOpen, status }: NavBarProps) => {
  const route = useRouter();

  return (
    <NavContainer status={status}>
      <ButtonLayout
        variant="clear"
        as="button"
        onClick={isOpen}
        css={{
          padding: '0px',
          position: 'absolute',
          maxWidth: '30px',
          top: '71px',
          right: '26px',
        }}
      >
        <Close />
      </ButtonLayout>
      <h3>{name}&apos;s Tape</h3>
      <LoginStatus>
        <KakaoLogin />
        <span>카카오로 로그인 중 </span>
      </LoginStatus>
      <List>
        <Link href="/modify-tape-info">
          <li>
            <Setting />
            <span>테이프 수정</span>
          </li>
        </Link>
        <Link href="/guide">
          <li>
            <Document />
            <span>서비스 설명</span>
          </li>
        </Link>
        <Link
          href="https://www.notion.so/Voice-Tape-041b53af5dce4da880e360d250c1bcab"
          target="_blank"
          rel="noreferrer noopener"
        >
          <li>
            <DownLoad />
            <span> 서비스 다운로드 받는 법</span>
          </li>
        </Link>
        <Link href="/withdrawal">
          <li css={{ cursor: 'pointer' }}>
            <Withdrawal />
            <span>탈퇴하기</span>
          </li>
        </Link>
      </List>
      <Bottom>
        <Bar />
        <LogoutLi
          css={{ cursor: 'pointer' }}
          onClick={() => {
            mainInstance.logout().then(() => {
              removeAuthToken('accessToken');
              window.localStorage.removeItem('persist');
              route.push('/');
            });
          }}
        >
          <Logout />
          <span>로그아웃</span>
        </LogoutLi>
      </Bottom>
    </NavContainer>
  );
};

export default NavBar;
