import {ReactElement} from 'react';
import Layout from '@/components/layout/Layout';
import Skills from '@/components/views/Skills/Skills';
import {
  StaticProps,
  StaticPropsResponse,
} from '@/shared/types/StaticProps.type';
import {ISkill} from 'my-portfolio-types';
import {NextPageWithAuth} from '@/shared/types/Page.type';
import {fetchAllSkills} from '@/services/skills.service';

const SkillsPage: NextPageWithAuth<StaticProps<Array<ISkill>>> = ({
  payload,
}): ReactElement => {
  return (
    <Layout title={'Skills'} description={'Skills page'}>
      <Skills payload={payload} />
    </Layout>
  );
};

export async function getStaticProps(): Promise<
  StaticPropsResponse<Array<ISkill>>
> {
  const payload: Array<ISkill> = await fetchAllSkills();

  return {
    props: {payload},
    revalidate: 1,
  };
}

SkillsPage.withAuth = true;

export default SkillsPage;
