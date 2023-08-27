import { NextPageWithAuth } from '@/shared/types/Page.type';
import { ReactElement } from 'react';
import Layout from '@/components/layout/Layout';
import { StaticProps, StaticPropsResponse } from '@/shared/types/StaticProps.type';
import { ISkill } from 'my-portfolio-types';
import { fetchById } from '@/services/data.service';
import { EndpointsList } from '@/shared/Endpoints.enum';
import { GetStaticPaths, GetStaticProps } from 'next';
import SkillForm from '@/components/views/Skills/SkillForm';
import {fetchAllSkills} from '@/services/skills.service';

const UpdateSkillsPage: NextPageWithAuth<StaticProps<ISkill>> = ({payload}): ReactElement => {
  return (
    <Layout title={'Update skill'} description={'Update skill page'}>
      <SkillForm type={'update'} payload={payload}/>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const payload: Array<ISkill> = await fetchAllSkills();
  const paths = payload.map((item) => ({ params: { id: item.id } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<StaticProps<ISkill>> = async (context): Promise<StaticPropsResponse<ISkill>> => {
  try {
    const id = context.params?.id as string;
    const payload: ISkill = await fetchById(EndpointsList.SKILLS, id);

    return {
      props: { payload },
      revalidate: 10,
    };
  } catch (err) {
    return Promise.reject({} as ISkill);
  }
};

UpdateSkillsPage.withAuth = true;

export default UpdateSkillsPage;
