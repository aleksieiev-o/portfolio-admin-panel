import {NextPageWithAuth} from '@/shared/types/Page.type';
import {ReactElement} from 'react';
import Layout from '@/components/layout/Layout';
import DocumentsForm from '@/components/views/Documents/DocumentsForm';

const CreateDocumentPage: NextPageWithAuth = (): ReactElement => {
  return (
    <Layout title={'Create document'} description={'Create document page'}>
      <DocumentsForm type={'create'} payload={null} />
    </Layout>
  );
};

CreateDocumentPage.withAuth = true;

export default CreateDocumentPage;
