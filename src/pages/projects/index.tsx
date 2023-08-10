import { ReactElement } from 'react';
import Layout from '@/components/layout/Layout';
import Projects from '@/components/views/Projects/Projects';
import { NextPageWithAuth } from '@/shared/types/Page.type';
import { IProject } from 'my-portfolio-types';
import { fetchAllProjects } from '@/services/projects.service';
import { StaticProps, StaticPropsResponse } from '@/shared/types/StaticProps.type';
import { GetStaticProps } from 'next';

const ProjectsPage: NextPageWithAuth<StaticProps<Array<IProject>>> = ({payload}): ReactElement => {
  return (
    <Layout title={'Projects'} description={'Projects page'}>
      <Projects payload={payload}/>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<StaticProps<Array<IProject>>> = async (): Promise<StaticPropsResponse<Array<IProject>>> => {
  const payload: Array<IProject> = await fetchAllProjects();

  return {
    props: { payload },
    revalidate: 10,
  };
};

ProjectsPage.withAuth = true;

export default ProjectsPage;
