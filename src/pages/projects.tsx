import { ReactElement } from 'react';
import Layout from '@/components/layout/Layout';
import Projects from '@/components/views/Projects/Projects';
import { NextPageWithAuth } from '@/types/Page.type';

const ProjectsPage: NextPageWithAuth = (): ReactElement => {
  return (
    <Layout title={'Projects'} description={'Projects page'}>
      <Projects/>
    </Layout>
  );
};

ProjectsPage.withAuth = true;

export default ProjectsPage;
