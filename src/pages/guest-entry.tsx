import Button from 'components/button';
import Tape from 'components/tape';
import Link from 'next/link';
import { Container, Zone } from 'styles';

const guestEntry = () => {
  return (
    <Container>
      <Zone css={{ gap: '32px' }}>
        <div>
          <h1>벨라&apos;s Tape</h1>
          <h3>나의 새로운 도전을 응원해줘!</h3>
        </div>
        <Tape title="2023 한정판 테이프" date="21.01.01" sec="144" />
        <p>
          평소 전하지 못했던 마음을 <br /> 목소리로 담아보세요 ♡
        </p>
      </Zone>
      <Zone css={{ paddingTop: ' 176px' }}>
        <Link href="/decorate-tape-guest" css={{ maxWidth: '327px' }}>
          <Button variant="guest">목소리 남겨주기</Button>
        </Link>
      </Zone>
    </Container>
  );
};

export default guestEntry;
