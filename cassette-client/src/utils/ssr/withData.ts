import { dehydrate, QueryClient } from '@tanstack/react-query';

export function withPrefetchServerSideProps(
  queryKey: string,
  fetchData: () => Promise<any>,
) {
  return async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery([queryKey], fetchData);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  };
}
