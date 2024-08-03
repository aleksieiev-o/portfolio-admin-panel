'use client';

import {fetchAllDocuments} from '@/entities/documents/documents.service';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';
import {RoutePath, RouteName} from '@/shared/router/Routes.enum';
import EmptyListNotification from '@/shared/widgets/EmptyListNotification';
import PageContentCard from '@/shared/widgets/pageContent/_widgets/PageContentCard';
import PageContentHeader from '@/shared/widgets/pageContent/PageContentHeader';
import PageContentList from '@/shared/widgets/pageContent/PageContentList';
import {useQuery} from '@tanstack/react-query';
import {FC, ReactElement, useContext} from 'react';
import DocumentsContent from './_widgets/DocumentsContent';

const Documents: FC = (): ReactElement => {
  const {user} = useContext(AppAuthContext);

  const {
    data: documentsQueryData,
    isPending: documentsIsPending,
    isSuccess: documentsIsSuccess,
  } = useQuery({
    queryKey: [RoutePath.DOCUMENTS],
    queryFn: async () => await fetchAllDocuments(),
    staleTime: 5 * 1000,
    enabled: !!user,
  });

  return (
    <div className="flex h-full w-full flex-col gap-6 py-6">
      <PageContentHeader pageTitle={RouteName.DOCUMENTS} createTitle="Create new document" removeTitle="Remove all documents" createLink={RoutePath.CREATE_DOCUMENT} />

      <div className="grid w-full grid-cols-1 gap-4 overflow-hidden md:gap-6">
        <PageContentList pending={documentsIsPending}>
          {documentsIsSuccess ? (
            <>
              {documentsQueryData.map((document) => (
                <PageContentCard
                  key={document.id}
                  id={document.id}
                  title={document.title}
                  position={document.position}
                  visibility={document.visibility}
                  createdDate={document.createdDate}
                  updatedDate={document.updatedDate}
                >
                  <DocumentsContent lang={document.lang} />
                </PageContentCard>
              ))}
            </>
          ) : (
            <EmptyListNotification notification="documents list is empty" />
          )}
        </PageContentList>
      </div>
    </div>
  );
};

export default Documents;
