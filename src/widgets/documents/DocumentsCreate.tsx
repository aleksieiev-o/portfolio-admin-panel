'use client';

import {FC, ReactElement} from 'react';
import GoToPreviousPageButton from '@/shared/ui/appButton/GoToPreviousPage.button';
import PageTitle from '@/shared/widgets/PageTitle';
import {RouteName} from '@/shared/router/Routes.enum';
import CreateOrUpdateDocumentForm from './_features/createOrUpdateDocumentForm/CreateOrUpdateDocument.form';

const DocumentsCreate: FC = (): ReactElement => {
  return (
    <div className="h-hull flex w-full flex-col gap-6">
      <div className="flex w-full flex-row items-start justify-start gap-6 pt-6">
        <GoToPreviousPageButton />

        <PageTitle title={RouteName.DOCUMENTS_CREATE} />
      </div>

      <CreateOrUpdateDocumentForm mode="create" data={undefined} isPending={false} isSuccess={false} />
    </div>
  );
};

export default DocumentsCreate;
