import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import {getCurrentUser} from '@/lib/firebase/firebase-admin';
import DocumentsCreate from '@/widgets/documents/DocumentsCreate';
import ScreenNotAvailable from '@/shared/widgets/ScreenNotAvailable';

const DocumentsCreatePage: FC = async (): Promise<ReactElement> => {
  const currentUser = await getCurrentUser();

  return <ScrollContentWrapper>{currentUser ? <DocumentsCreate /> : <ScreenNotAvailable />}</ScrollContentWrapper>;
};

export default DocumentsCreatePage;
