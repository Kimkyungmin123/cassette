import Link from 'next/link';

import Close from '../../../public/assets/close.svg';
import Document from '../../../public/assets/document.svg';
import DownLoad from '../../../public/assets/downLoad.svg';
import KakaoLogin from '../../../public/assets/kakaoLogin.svg';
import Logout from '../../../public/assets/logout.svg';
import Setting from '../../../public/assets/setting.svg';
import Withdrawal from '../../../public/assets/withdrawal.svg';
import {
  Bar,
  Bottom,
  CloseZone,
  List,
  LoginStatus,
  NavContainer,
} from './style';

interface NavBarProps {
  name: string;
}

const NavBar = ({ name }: NavBarProps) => {
  return (
    <NavContainer>
      <CloseZone>
        <Close />
      </CloseZone>
      <h3>{name}&apos;s Tape</h3>
      <LoginStatus>
        <KakaoLogin />
        <span>카카오로 로그인 중 </span>
      </LoginStatus>
      <List>
        <Link href="#">
          <li>
            <Setting />
            <span>테이프 수정</span>
          </li>
        </Link>
        <Link href="#">
          <li>
            <Document />
            <span>서비스 실행</span>
          </li>
        </Link>
        <Link href="#">
          <li>
            <DownLoad />
            <span> 서비스 다운로드 받는 법</span>
          </li>
        </Link>
        <Link href="#">
          <li>
            <Withdrawal />
            <span> 탈퇴하기</span>
          </li>
        </Link>
      </List>
      <Bottom>
        <Bar />
        <Link href="#">
          <Logout />
          <span>로그아웃</span>
        </Link>
      </Bottom>
    </NavContainer>
  );
};

export default NavBar;
