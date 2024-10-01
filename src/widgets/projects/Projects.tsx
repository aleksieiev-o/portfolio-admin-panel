'use client';

import {fetchAllProjects, removeAllProjects} from '@/entities/projects/projects.service';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';
import {RouteName, RoutePath} from '@/shared/router/Routes.enum';
import PageContentCard from '@/shared/widgets/pageContent/_widgets/PageContentCard';
import PageContentHeaderWithActions from '@/shared/widgets/pageContent/PageContentHeaderWithActions';
import PageContentList from '@/shared/widgets/pageContent/PageContentList';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {FC, ReactElement, useContext, useMemo, useState} from 'react';
import ProjectContent from './_widgets/ProjectContent';
import RemoveConfirmProjectDialog from './_widgets/RemoveConfirmProject.dialog';
import {IProject} from 'my-portfolio-types';

const Projects: FC = (): ReactElement => {
  const {user} = useContext(AppAuthContext);
  const queryClient = useQueryClient();
  const [dialogRemoveIsOpen, setDialogRemoveIsOpen] = useState<boolean>(false);
  const [projectToRemove, setProjectToRemove] = useState<IProject>({} as IProject);

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

  const handlePrepareToRemove = async (id: string) => {
    const projectsQueryData = await queryClient.ensureQueryData({queryKey: [RoutePath.PROJECTS], queryFn: async () => await fetchAllProjects()});
    const project = projectsQueryData.find((project) => project.id === id)!;

    setProjectToRemove(project);
    setDialogRemoveIsOpen(true);
  };

  const isEmptyList = useMemo(() => Boolean(projectsQueryData && projectsQueryData.length === 0), [projectsQueryData]);

  return (
    <div className="flex h-full w-full flex-col gap-6 py-6">
      <PageContentHeaderWithActions
        pageTitle={RouteName.PROJECTS}
        createTitle="Create new project"
        removeTitle="Remove all projects"
        createLink={RoutePath.CREATE_PROJECT}
        dialogTitle={'Remove all projects confirmation'}
        dialogDescription={'You are about to remove all projects.'}
        dialogQuestion={'Are you sure you want to remove all projects?'}
        btnTitle={'Remove all projects'}
        toastDescription="All projects have successfully removed."
        handleRemoveAll={removeAllProjects}
        queryKey={RoutePath.PROJECTS}
        isEmptyList={isEmptyList}
        pending={projectsIsPending}
      />

      <div className="grid w-full grid-cols-1 gap-4 overflow-hidden md:gap-6">
        <PageContentList pending={projectsIsPending} isEmptyList={isEmptyList} emptyListNotification="Projects list is empty">
          {projectsQueryData && projectsQueryData.length > 0 && (
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
                  handleRemove={async () => await handlePrepareToRemove(project.id)}
                >
                  <ProjectContent project={project} />
                </PageContentCard>
              ))}
            </>
          )}
        </PageContentList>
      </div>

      <RemoveConfirmProjectDialog setDialogIsOpen={setDialogRemoveIsOpen} dialogIsOpen={dialogRemoveIsOpen} project={projectToRemove} />
    </div>
  );
};

export default Projects;
