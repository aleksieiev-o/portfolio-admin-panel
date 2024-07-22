import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import {RoutePath} from '@/shared/router/Routes.enum';
import {HydrationBoundary, QueryClient, dehydrate} from '@tanstack/react-query';
import {getCurrentUser} from '@/lib/firebase/firebase-admin';
import Projects from '@/widgets/projects/Projects';

const ProjectsPage: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  const currentUser = await getCurrentUser();

  if (currentUser) {
    await queryClient.prefetchQuery({
      queryKey: [RoutePath.PROJECTS, currentUser.uid],
      // queryFn: async () => await fetchCategories(currentUser.uid),
      staleTime: 5 * 1000,
    });
  }

  return (
    <ScrollContentWrapper>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Projects />
      </HydrationBoundary>
    </ScrollContentWrapper>
  );
};

export default ProjectsPage;
