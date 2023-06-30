import { ReactElement } from 'react';
import Layout from '@/components/layout/Layout';
import Skills from '@/components/views/Skills/Skills';
import { StaticProps, StaticPropsResponse } from '@/types/StaticProps.type';
import { ISkill } from 'my-portfolio-types';
import { NextPageWithAuth } from '@/types/Page.type';
import { fetchAllSkills } from '@/services/fetchSkills.service';

const SkillsPage: NextPageWithAuth<StaticProps<Array<ISkill>>> = (): ReactElement => {
  return (
    <Layout title={'Skills'} description={'Skills page'}>
      <Skills/>
    </Layout>
  );
};

export async function getStaticProps(): Promise<StaticPropsResponse<Array<ISkill>>> {
  const payload: Array<ISkill> = await fetchAllSkills();

  return {
    props: { payload },
    revalidate: 10,
  };
}

SkillsPage.withAuth = true;

export default SkillsPage;
