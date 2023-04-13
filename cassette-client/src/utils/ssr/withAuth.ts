import { GetServerSidePropsContext } from 'next';

export function withAuthServerSideProps(getServerSidePropsFunc: any) {
  return async (context: GetServerSidePropsContext) => {
    const { accessToken } = context.req.cookies;

    if (!accessToken) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return await getServerSidePropsFunc(context);
  };
}
