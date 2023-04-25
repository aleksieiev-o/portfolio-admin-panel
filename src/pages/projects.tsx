import { ReactElement } from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import Projects from '@/components/views/Projects/Projects';

const ProjectsPage: NextPage = (): ReactElement => {
  return (
    <Layout title={'Projects'} description={'Projects page'}>
      <Projects/>
    </Layout>
  );
};

export default ProjectsPage;
