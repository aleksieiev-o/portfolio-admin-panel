'use client';

import {FC, ReactElement, useContext} from 'react';
import GoToPreviousPageButton from '@/shared/ui/appButton/GoToPreviousPage.button';
import PageTitle from '@/shared/widgets/PageTitle';
import {RouteName} from '@/shared/router/Routes.enum';
import CreateOrUpdateDocumentForm from './_features/createOrUpdateDocumentForm/CreateOrUpdateDocument.form';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';
import {useSearchParams} from 'next/navigation';
import {useQuery} from '@tanstack/react-query';
import {fetchDocumentByID} from '@/entities/documents/documents.service';

const DocumentsUpdate: FC = (): ReactElement => {
  const {user} = useContext(AppAuthContext);
  const searchParams = useSearchParams();

  const projectID = searchParams.get('id') || '';

  const {
    data: projectQueryData,
    isPending: projectsIsPending,
    isSuccess: projectsIsSuccess,
  } = useQuery({
    queryKey: [projectID],
    queryFn: async () => await fetchDocumentByID(projectID),
    staleTime: 5 * 1000,
    enabled: !!user,
  });

  return (
    <div className="h-hull flex w-full flex-col gap-6">
      <div className="flex w-full flex-row items-start justify-start gap-6 pt-6">
        <GoToPreviousPageButton />

        <PageTitle title={RouteName.DOCUMENTS_UPDATE} />
      </div>

      <CreateOrUpdateDocumentForm mode="update" data={projectQueryData} isPending={projectsIsPending} isSuccess={projectsIsSuccess} />
    </div>
  );
};

export default DocumentsUpdate;
