'use client';

import {fetchAllProjects} from '@/entities/projects/projects.service';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';
import {RoutePath} from '@/shared/router/Routes.enum';
import {useQuery} from '@tanstack/react-query';
import {FC, ReactElement, useContext} from 'react';

const Projects: FC = (): ReactElement => {
  const {user} = useContext(AppAuthContext);

  const {
    data: projectsQueryData,
    isPending: projectsIsPending,
    isSuccess: projectsIsSuccess,
  } = useQuery({
    queryKey: [RoutePath.PROJECTS],
    queryFn: async () => await fetchAllProjects(),
    staleTime: 5 * 1000,
    enabled: !!user,
  });

  return <div>Projects</div>;
};

export default Projects;
