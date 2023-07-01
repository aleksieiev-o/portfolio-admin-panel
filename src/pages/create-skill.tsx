import { NextPageWithAuth } from '@/shared/types/Page.type';
import { ReactElement } from 'react';
import Layout from '@/components/layout/Layout';
import CreateSkill from '@/components/views/Skills/CreateSkill';

const CreateSkillPage: NextPageWithAuth = (): ReactElement => {
  return (
    <Layout title={'Create skill'} description={'Create skill page'}>
      <CreateSkill/>
    </Layout>
  );
};

CreateSkillPage.withAuth = true;

export default CreateSkillPage;
