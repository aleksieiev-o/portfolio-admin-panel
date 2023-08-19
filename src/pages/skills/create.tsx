import { NextPageWithAuth } from '@/shared/types/Page.type';
import { ReactElement } from 'react';
import Layout from '@/components/layout/Layout';
import SkillForm from '@/components/views/Skills/SkillForm';

const CreateSkillPage: NextPageWithAuth = (): ReactElement => {
  return (
    <Layout title={'Create skill'} description={'Create skill page'}>
      <SkillForm type={'create'} payload={null}/>
    </Layout>
  );
};

CreateSkillPage.withAuth = true;

export default CreateSkillPage;
