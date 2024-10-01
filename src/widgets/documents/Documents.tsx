'use client';

import {fetchAllDocuments, removeAllDocuments} from '@/entities/documents/documents.service';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';
import {RoutePath, RouteName} from '@/shared/router/Routes.enum';
import EmptyListNotification from '@/shared/widgets/EmptyListNotification';
import PageContentCard from '@/shared/widgets/pageContent/_widgets/PageContentCard';
import PageContentHeaderWithActions from '@/shared/widgets/pageContent/PageContentHeaderWithActions';
import PageContentList from '@/shared/widgets/pageContent/PageContentList';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {FC, ReactElement, useContext, useMemo, useState} from 'react';
import DocumentsContent from './_widgets/DocumentsContent';
import {IDocument} from 'my-portfolio-types';
import RemoveDocumentConfirmDialog from './_widgets/RemoveDocumentConfirm.dialog';

const Documents: FC = (): ReactElement => {
  const {user} = useContext(AppAuthContext);
  const queryClient = useQueryClient();
  const [dialogRemoveIsOpen, setDialogRemoveIsOpen] = useState<boolean>(false);
  const [documentToRemove, setDocumentToRemove] = useState<IDocument>({} as IDocument);

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

  const handlePrepareToRemove = async (id: string) => {
    const documentsQueryData = await queryClient.ensureQueryData({queryKey: [RoutePath.DOCUMENTS], queryFn: async () => await fetchAllDocuments()});
    const document = documentsQueryData.find((document) => document.id === id)!;

    setDocumentToRemove(document);
    setDialogRemoveIsOpen(true);
  };

  const isEmptyList = useMemo(() => Boolean(documentsQueryData && documentsQueryData.length === 0), [documentsQueryData]);

  return (
    <div className="flex h-full w-full flex-col gap-6 py-6">
      <PageContentHeaderWithActions
        pageTitle={RouteName.DOCUMENTS}
        createTitle="Create new document"
        removeTitle="Remove all documents"
        createLink={RoutePath.CREATE_DOCUMENT}
        dialogTitle={'Remove all documents confirmation'}
        dialogDescription={'You are about to remove all documents.'}
        dialogQuestion={'Are you sure you want to remove all documents?'}
        btnTitle={'Remove all documents'}
        toastDescription="All documents have successfully removed."
        handleRemoveAll={removeAllDocuments}
        queryKey={RoutePath.DOCUMENTS}
        isEmptyList={isEmptyList}
        pending={documentsIsPending}
      />

      <div className="grid w-full grid-cols-1 gap-4 overflow-hidden md:gap-6">
        <PageContentList pending={documentsIsPending} isEmptyList={isEmptyList} emptyListNotification="Documents list is empty">
          {documentsQueryData && documentsQueryData.length > 0 && (
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
                  pageDirection={RoutePath.DOCUMENTS}
                  updateButtonTitle="Update document"
                  removeButtonTitle="Remove document"
                  handleRemove={async () => await handlePrepareToRemove(document.id)}
                >
                  <DocumentsContent lang={document.lang} />
                </PageContentCard>
              ))}
            </>
          )}
        </PageContentList>
      </div>

      <RemoveDocumentConfirmDialog setDialogIsOpen={setDialogRemoveIsOpen} dialogIsOpen={dialogRemoveIsOpen} document={documentToRemove} />
    </div>
  );
};

export default Documents;
