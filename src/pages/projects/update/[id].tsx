import { NextPageWithAuth } from '@/shared/types/Page.type';
import { ReactElement } from 'react';
import Layout from '@/components/layout/Layout';
import { StaticProps, StaticPropsResponse } from '@/shared/types/StaticProps.type';
import { IProject } from 'my-portfolio-types';
import { fetchById } from '@/services/data.service';
import { EndpointsList } from '@/shared/Endpoints.enum';
import { GetStaticPaths, GetStaticProps } from 'next';
import { fetchAllProjects } from '@/services/projects.service';
import ProjectForm from '@/components/views/Projects/ProjectForm';

const UpdateProjectPage: NextPageWithAuth<StaticProps<IProject>> = ({payload}): ReactElement => {
  return (
    <Layout title={'Update project'} description={'Update project page'}>
      <ProjectForm type={'update'} payload={payload}/>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const payload: Array<IProject> = await fetchAllProjects();
  const paths = payload.map((item) => ({ params: { id: item.id } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<StaticProps<IProject>> = async (context): Promise<StaticPropsResponse<IProject>> => {
  try {
    const id = context.params?.id as string;
    const payload: IProject = await fetchById(EndpointsList.PROJECTS, id);

    return {
      props: { payload },
      revalidate: 1,
    };
  } catch (err) {
    return Promise.reject({} as IProject);
  }
};

UpdateProjectPage.withAuth = true;

export default UpdateProjectPage;
