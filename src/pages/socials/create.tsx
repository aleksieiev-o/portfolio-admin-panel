import {ReactElement} from 'react';
import Layout from '@/components/layout/Layout';
import {NextPageWithAuth} from '@/shared/types/Page.type';
import SocialCardForm from '@/components/views/Socials/SocialCardForm';

const SocialPage: NextPageWithAuth = (): ReactElement => {
  return (
    <Layout
      title={'Create social card'}
      description={'Create social card page'}
    >
      <SocialCardForm type={'create'} payload={null} />
    </Layout>
  );
};

SocialPage.withAuth = true;

export default SocialPage;
