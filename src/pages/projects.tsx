import { ReactElement } from 'react';
import Layout from '@/components/layout/Layout';
import Projects from '@/components/views/Projects/Projects';
import { NextPageWithAuth } from '@/types/Page.type';
import { IProject } from 'my-portfolio-types';
import { fetchAllProjects } from '@/services/fetchProjects.service';
import { StaticProps, StaticPropsResponse } from '@/types/StaticProps.type';

const ProjectsPage: NextPageWithAuth<StaticProps<Array<IProject>>> = (props): ReactElement => {
  const {payload} = props;

  return (
    <Layout title={'Projects'} description={'Projects page'}>
      <Projects/>
    </Layout>
  );
};

export async function getStaticProps(): Promise<StaticPropsResponse<Array<IProject>>> {
  const payload: Array<IProject> = await fetchAllProjects();

  return {
    props: { payload },
    revalidate: 30,
  };
}

ProjectsPage.withAuth = true;

export default ProjectsPage;
