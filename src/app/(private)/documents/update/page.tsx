import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import {getCurrentUser} from '@/lib/firebase/firebase-admin';
import ScreenNotAvailable from '@/shared/widgets/ScreenNotAvailable';
import DocumentsUpdate from '@/widgets/documents/DocumentsUpdate';
import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
import {RoutePath} from '@/shared/router/Routes.enum';
import {fetchAllDocuments} from '@/entities/documents/documents.service';

const DocumentsUpdatePage: FC = async (): Promise<ReactElement> => {
  const queryClient = new QueryClient();
  const currentUser = await getCurrentUser();

  if (currentUser) {
    await queryClient.prefetchQuery({
      queryKey: [RoutePath.DOCUMENTS, currentUser.uid],
      queryFn: async () => await fetchAllDocuments(currentUser.uid), // TODO It must use fetchDocumentByID function
      staleTime: 5 * 1000,
    });
  }

  return (
    <ScrollContentWrapper>
      {currentUser ? (
        <HydrationBoundary state={dehydrate(queryClient)}>
          <DocumentsUpdate />
        </HydrationBoundary>
      ) : (
        <ScreenNotAvailable />
      )}
    </ScrollContentWrapper>
  );
};

export default DocumentsUpdatePage;
