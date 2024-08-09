'use client';

import {FC, ReactElement} from 'react';
import GoToPreviousPageButton from '@/shared/ui/appButton/GoToPreviousPage.button';
import PageTitle from '@/shared/widgets/PageTitle';
import {RouteName} from '@/shared/router/Routes.enum';
import CreateOrUpdateProjectForm from './_features/createOrUpdateProjectForm/CreateOrUpdateProject.form';

const ProjectsCreate: FC = (): ReactElement => {
  return (
    <div className="h-hull flex w-full flex-col gap-6">
      <div className="flex w-full flex-row items-start justify-start gap-6 pt-6">
        <GoToPreviousPageButton />

        <PageTitle title={RouteName.PROJECTS_CREATE} />
      </div>

      <CreateOrUpdateProjectForm mode="create" />
    </div>
  );
};

export default ProjectsCreate;
