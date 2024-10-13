'use client';

import {FC, ReactElement} from 'react';
import GoToPreviousPageButton from '@/shared/ui/appButton/GoToPreviousPage.button';
import PageTitle from '@/shared/widgets/PageTitle';
import {RouteName} from '@/shared/router/Routes.enum';
import CreateOrUpdateSocialForm from './_features/createOrUpdateSkillForm/CreateOrUpdateSkill.form';

const SocialsCreate: FC = (): ReactElement => {
  return (
    <div className="h-hull flex w-full flex-col gap-6">
      <div className="flex w-full flex-row items-start justify-start gap-6 pt-6">
        <GoToPreviousPageButton />

        <PageTitle title={RouteName.SOCIALS_CREATE} />
      </div>

      <CreateOrUpdateSocialForm mode="create" data={undefined} isPending={false} isSuccess={false} />
    </div>
  );
};

export default SocialsCreate;
