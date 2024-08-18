import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import {getCurrentUser} from '@/lib/firebase/firebase-admin';
import ScreenNotAvailable from '@/shared/widgets/ScreenNotAvailable';
import ProjectsUpdate from '@/widgets/projects/ProjectsUpdate';
import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
import {RoutePath} from '@/shared/router/Routes.enum';
import {fetchAllProjects} from '@/entities/projects/projects.service';

const ProjectsUpdatePage: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  const currentUser = await getCurrentUser();

  if (currentUser) {
    await queryClient.prefetchQuery({
      queryKey: [RoutePath.PROJECTS, currentUser.uid],
      queryFn: async () => await fetchAllProjects(currentUser.uid), // TODO It must use fetchProjectByID function
      staleTime: 5 * 1000,
    });
  }

  return (
    <ScrollContentWrapper>
      {currentUser ? (
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProjectsUpdate />
        </HydrationBoundary>
      ) : (
        <ScreenNotAvailable />
      )}
    </ScrollContentWrapper>
  );
};

export default ProjectsUpdatePage;
