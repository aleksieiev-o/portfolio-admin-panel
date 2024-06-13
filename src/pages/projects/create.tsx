import {NextPageWithAuth} from '@/shared/types/Page.type';
import {ReactElement} from 'react';
import Layout from '@/components/layout/Layout';
import ProjectForm from '@/components/views/Projects/ProjectForm';

const CreateProjectPage: NextPageWithAuth = (): ReactElement => {
  return (
    <Layout title={'Create project'} description={'Create project page'}>
      <ProjectForm type={'create'} payload={null} />
    </Layout>
  );
};

CreateProjectPage.withAuth = true;

export default CreateProjectPage;
