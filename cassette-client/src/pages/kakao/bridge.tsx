import Roading from 'components/loading';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUserStore } from 'store';
import mainInstance from 'utils/api/main';
import { setAuthToken } from 'utils/storage/authCookie';

const Bridge = () => {
  const router = useRouter();
  const { code } = router.query;
  const { setResponsUser, setTapeColor } = useUserStore();

  useEffect(() => {
    if (code) {
      mainInstance.kakaoSocialLogin(code as string).then((data) => {
        if (!data) router.push('/');
        setAuthToken('accessToken', data.result.jwtInformation.accessToken),
          data.result.tapes.length === 0
            ? (router.push('/create-tape'), setTapeColor('cassette_orange'))
            : (router.push('/create-tape-completed'),
              setResponsUser(
                data.result.tapes[0]['tapeLink'],
                data.result.tapes[0]['tapeId'],
              ));
      });
    }
  }, [code, router, setResponsUser, setTapeColor]);

  return (
    <div
      css={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'cneter',
        alignItems: 'center',
      }}
    >
      <Roading />
    </div>
  );
};

export default Bridge;
