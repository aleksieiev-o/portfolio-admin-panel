import {NextPageWithAuth} from '@/shared/types/Page.type';
import {ReactElement} from 'react';
import Layout from '@/components/layout/Layout';
import {
  StaticProps,
  StaticPropsResponse,
} from '@/shared/types/StaticProps.type';
import {IDocument} from 'my-portfolio-types';
import {fetchById} from '@/services/data.service';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {GetStaticPaths, GetStaticProps} from 'next';
import {fetchAllDocuments} from '@/services/documents.service';
import DocumentsForm from '@/components/views/Documents/DocumentsForm';

const UpdateDocumentPage: NextPageWithAuth<StaticProps<IDocument>> = ({
  payload,
}): ReactElement => {
  return (
    <Layout title={'Update project'} description={'Update project page'}>
      <DocumentsForm type={'update'} payload={payload} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const payload: Array<IDocument> = await fetchAllDocuments();
  const paths = payload.map((item) => ({params: {id: item.id}}));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<StaticProps<IDocument>> = async (
  context,
): Promise<StaticPropsResponse<IDocument>> => {
  try {
    const id = context.params?.id as string;
    const payload: IDocument = await fetchById(EndpointsList.DOCUMENTS, id);

    return {
      props: {payload},
      revalidate: 1,
    };
  } catch (err) {
    return Promise.reject({} as IDocument);
  }
};

UpdateDocumentPage.withAuth = true;

export default UpdateDocumentPage;
