import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import {getCurrentUser} from '@/lib/firebase/firebase-admin';
import ScreenNotAvailable from '@/shared/widgets/ScreenNotAvailable';
import SkillsUpdate from '@/widgets/skills/SkillsUpdate';
import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
import {RoutePath} from '@/shared/router/Routes.enum';
import {fetchAllSkills} from '@/entities/skills/skills.service';

const SkillsUpdatePage: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  const currentUser = await getCurrentUser();

  if (currentUser) {
    await queryClient.prefetchQuery({
      queryKey: [RoutePath.SKILLS, currentUser.uid],
      queryFn: async () => await fetchAllSkills(currentUser.uid), // TODO It must use fetchSkillByID function
      staleTime: 5 * 1000,
    });
  }

  return (
    <ScrollContentWrapper>
      {currentUser ? (
        <HydrationBoundary state={dehydrate(queryClient)}>
          <SkillsUpdate />
        </HydrationBoundary>
      ) : (
        <ScreenNotAvailable />
      )}
    </ScrollContentWrapper>
  );
};

export default SkillsUpdatePage;
