import { ReactElement } from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import Skills from '@/components/views/Skills/Skills';

const SkillsPage: NextPage = (): ReactElement => {
  return (
    <Layout title={'Skills'} description={'Skills page'}>
      <Skills/>
    </Layout>
  );
};

export default SkillsPage;
