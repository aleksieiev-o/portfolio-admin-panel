import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import {RoutePath} from '@/shared/router/Routes.enum';
import {HydrationBoundary, QueryClient, dehydrate} from '@tanstack/react-query';
import {getCurrentUser} from '@/lib/firebase/firebase-admin';
import PersonalInfo from '@/widgets/personal-info/PersonalInfo';
import {fetchPersonalInfo} from '@/entities/personalInfo/personalInfo.service';
import {fetchMainImage} from '@/entities/files/files.service';

const PersonalInfoPage: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  const currentUser = await getCurrentUser();

  if (currentUser) {
    await queryClient.prefetchQuery({
      queryKey: [RoutePath.PERSONAL_INFO, currentUser.uid],
      queryFn: async () => await fetchPersonalInfo(currentUser.uid),
      staleTime: 5 * 1000,
    });

    await queryClient.prefetchQuery({
      queryKey: [RoutePath.MAIN_IMAGE, currentUser.uid],
      queryFn: async () => await fetchMainImage(currentUser.uid),
      staleTime: 5 * 1000,
    });
  }

  return (
    <ScrollContentWrapper>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PersonalInfo />
      </HydrationBoundary>
    </ScrollContentWrapper>
  );
};

export default PersonalInfoPage;
