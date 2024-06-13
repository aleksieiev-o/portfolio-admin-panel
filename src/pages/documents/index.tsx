import {ReactElement} from 'react';
import Layout from '@/components/layout/Layout';
import {
  StaticProps,
  StaticPropsResponse,
} from '@/shared/types/StaticProps.type';
import {NextPageWithAuth} from '@/shared/types/Page.type';
import {IDocument} from 'my-portfolio-types';
import Documents from '@/components/views/Documents/Documents';
import {fetchAllDocuments} from '@/services/documents.service';

const DocumentsPage: NextPageWithAuth<StaticProps<Array<IDocument>>> = ({
  payload,
}): ReactElement => {
  return (
    <Layout title={'Documents'} description={'Documents page'}>
      <Documents payload={payload} />
    </Layout>
  );
};

export async function getStaticProps(): Promise<
  StaticPropsResponse<Array<IDocument>>
> {
  const payload: Array<IDocument> = await fetchAllDocuments();

  return {
    props: {payload},
    revalidate: 1,
  };
}

DocumentsPage.withAuth = true;

export default DocumentsPage;
