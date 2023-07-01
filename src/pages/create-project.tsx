import { NextPageWithAuth } from '@/shared/types/Page.type';
import { ReactElement } from 'react';
import Layout from '@/components/layout/Layout';
import CreateProject from '@/components/views/Projects/CreateProject';

const CreateProjectPage: NextPageWithAuth = (): ReactElement => {
  return (
    <Layout title={'Create project'} description={'Create project page'}>
      <CreateProject/>
    </Layout>
  );
};

CreateProjectPage.withAuth = true;

export default CreateProjectPage;
