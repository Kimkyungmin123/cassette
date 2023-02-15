import Network from '@icon/network.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ButtonZone, Container404, RedirectButton } from 'styles/404';

const Custom404 = () => {
  const route = useRouter();

  return (
    <Container404>
      <h1>
        <Network />
        <span>404 Page Not Found</span>
      </h1>

      <p>
        죄송합니다. <br />
        원하시는 페이지를 <br />
        찾을 수 없습니다.
      </p>

      <ButtonZone>
        <RedirectButton variant="clear" onClick={() => route.back()}>
          이전 페이지로
        </RedirectButton>
        <Link href="/">
          <RedirectButton variant="clear">홈으로 </RedirectButton>
        </Link>
      </ButtonZone>
    </Container404>
  );
};

export default Custom404;
