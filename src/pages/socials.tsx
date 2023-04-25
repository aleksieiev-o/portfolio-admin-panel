import { ReactElement } from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import Socials from '@/components/views/Socials/Socials';

const SocialsPage: NextPage = (): ReactElement => {
  return (
    <Layout title={'Socials'} description={'Socials page'}>
      <Socials/>
    </Layout>
  );
};

export default SocialsPage;
