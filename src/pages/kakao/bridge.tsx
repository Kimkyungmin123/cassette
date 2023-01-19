import { useRouter } from 'next/router';
import { useEffect } from 'react';
import mainInstance from 'utils/api/main';
import { setAuthToken } from 'utils/storage/authCookie';

const Bridge = () => {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (code) {
      mainInstance.KakaoSocialLogin(code).then((data) => {
        setAuthToken('accessToken', data.result.jwtInformation.accessToken),
          data.result.tapes.length === 0
            ? router.push('/create-tape')
            : router.push('/create-tape-completed');
      });
    }
  }, [code, router]);

  return <div>로딩중...입니다...</div>;
};

export default Bridge;
