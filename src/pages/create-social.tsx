import { ReactElement } from 'react';
import Layout from '@/components/layout/Layout';
import { NextPageWithAuth } from '@/shared/types/Page.type';
import CreateSocials from '@/components/views/Socials/CreateSocials';

const SocialPage: NextPageWithAuth = (): ReactElement => {
  return (
    <Layout title={'Socials'} description={'Socials page'}>
      <CreateSocials/>
    </Layout>
  );
};

SocialPage.withAuth = true;

export default SocialPage;
