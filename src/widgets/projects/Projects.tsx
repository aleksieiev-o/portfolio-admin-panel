'use client';

import {fetchAllProjects} from '@/entities/projects/projects.service';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';
import {RouteName, RoutePath} from '@/shared/router/Routes.enum';
import PageContentCard from '@/shared/widgets/pageContent/_widgets/PageContentCard';
import PageContentHeader from '@/shared/widgets/pageContent/PageContentHeader';
import PageContentList from '@/shared/widgets/pageContent/PageContentList';
import {useQuery} from '@tanstack/react-query';
import {FC, ReactElement, useContext, useState} from 'react';
import ProjectContent from './_widgets/ProjectContent';
import EmptyListNotification from '@/shared/widgets/EmptyListNotification';
import RemoveConfirmProjectDialog from './_widgets/RemoveConfirmProject.dialog';

const Projects: FC = (): ReactElement => {
  const {user} = useContext(AppAuthContext);
  const [dialogRemoveIsOpen, setDialogRemoveIsOpen] = useState<boolean>(false);

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

  const handlePrepareDelete = () => {
    setDialogRemoveIsOpen(true);
  };

  return (
    <div className="flex h-full w-full flex-col gap-6 py-6">
      <PageContentHeader pageTitle={RouteName.PROJECTS} createTitle="Create new project" removeTitle="Remove all projects" createLink={RoutePath.CREATE_PROJECT} />

      <div className="grid w-full grid-cols-1 gap-4 overflow-hidden md:gap-6">
        <PageContentList pending={projectsIsPending}>
          {projectsQueryData && projectsQueryData.length > 0 ? (
            <>
              {projectsQueryData.map((project) => (
                <PageContentCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  position={project.position}
                  visibility={project.visibility}
                  createdDate={project.createdDate}
                  updatedDate={project.updatedDate}
                  pageDirection={RoutePath.PROJECTS}
                  updateButtonTitle="Update project"
                  removeButtonTitle="Remove project"
                  handleRemove={handlePrepareDelete}
                >
                  <>
                    <ProjectContent project={project} />

                    <RemoveConfirmProjectDialog setDialogIsOpen={setDialogRemoveIsOpen} dialogIsOpen={dialogRemoveIsOpen} project={project} />
                  </>
                </PageContentCard>
              ))}
            </>
          ) : (
            <EmptyListNotification notification="Projects list is empty" />
          )}
        </PageContentList>
      </div>
    </div>
  );
};

export default Projects;
