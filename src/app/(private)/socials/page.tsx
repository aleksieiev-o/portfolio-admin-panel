import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import {RoutePath} from '@/shared/router/Routes.enum';
import {HydrationBoundary, QueryClient, dehydrate} from '@tanstack/react-query';
import {getCurrentUser} from '@/lib/firebase/firebase-admin';
import Socials from '@/widgets/socials/Socials';
import {fetchAllSocials} from '@/entities/socials/socials.service';

const DocumentsPage: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  const currentUser = await getCurrentUser();

  if (currentUser) {
    await queryClient.prefetchQuery({
      queryKey: [RoutePath.SOCIALS, currentUser.uid],
      queryFn: async () => await fetchAllSocials(currentUser.uid),
      staleTime: 5 * 1000,
    });
  }

  return (
    <ScrollContentWrapper>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Socials />
      </HydrationBoundary>
    </ScrollContentWrapper>
  );
};

export default DocumentsPage;
