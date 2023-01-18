import Button from 'components/button';
import Tape from 'components/tape';
import Link from 'next/link';
import { Container, Zone } from 'styles';

import Kakao from '../../public/assets/kakao.svg';

export default function Home() {
  const LOGIN_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_REST_API}&redirect_uri=${process.env.NEXT_PUBLIC_CLIENT_URL}/kakao/bridge`;
  return (
    <Container>
      <Zone css={{ gap: '32px' }}>
        <div>
          <h1>2023 Vioce Tape</h1>
          <h3>내 목소리가 들리니?</h3>
        </div>
        <Tape title="2023 한정판 테이프" date="21.01.01" sec="144" />
        <p>
          평소 전하지 못했던 마음을
          <br /> 목소리로 담아보세요 ♡
        </p>
      </Zone>
      <Zone css={{ gap: '16px', paddingTop: ' 106px', maxWidth: '327px' }}>
        <Link href={LOGIN_URL}>
          <Button variant="kakao">
            <Kakao />
            카카오 로그인
          </Button>
        </Link>
        <Link href="/decorate-tape" css={{ maxWidth: '327px' }}>
          <Button variant="main">내 테이프 만들기</Button>
        </Link>
      </Zone>
    </Container>
  );
}
