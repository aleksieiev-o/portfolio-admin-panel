import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import {getCurrentUser} from '@/lib/firebase/firebase-admin';
import ScreenNotAvailable from '@/shared/widgets/ScreenNotAvailable';
import SocialsUpdate from '@/widgets/socials/SocialsUpdate';
import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
import {RoutePath} from '@/shared/router/Routes.enum';
import {fetchAllSocials} from '@/entities/socials/socials.service';

const SocialsUpdatePage: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  const currentUser = await getCurrentUser();

  if (currentUser) {
    await queryClient.prefetchQuery({
      queryKey: [RoutePath.SOCIALS, currentUser.uid],
      queryFn: async () => await fetchAllSocials(currentUser.uid), // TODO It must use fetchSocialByID function
      staleTime: 5 * 1000,
    });
  }

  return (
    <ScrollContentWrapper>
      {currentUser ? (
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SocialsUpdate />
        </HydrationBoundary>
      ) : (
        <ScreenNotAvailable />
      )}
    </ScrollContentWrapper>
  );
};

export default SocialsUpdatePage;
