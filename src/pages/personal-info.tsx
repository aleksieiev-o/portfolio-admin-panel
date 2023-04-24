import { ReactElement } from 'react';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import PersonalInfo from '@/components/views/PersonalInfo/PersonalInfo';

const PersonalInfoPage: NextPage = (): ReactElement => {
  return (
    <Layout title={'Personal info'} description={'Personal info page'}>
      <PersonalInfo/>
    </Layout>
  );
};

export default PersonalInfoPage;
