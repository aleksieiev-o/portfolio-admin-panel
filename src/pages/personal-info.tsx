import { ReactElement } from 'react';
import Layout from '@/components/layout/Layout';
import PersonalInfo from '@/components/views/PersonalInfo/PersonalInfo';
import { StaticProps, StaticPropsResponse } from '@/types/StaticProps.type';
import { IPersonalInfo } from 'my-portfolio-types';
import { fetchPersonalInfo } from '@/services/fetchPersonalInfo.service';
import { NextPageWithAuth } from '@/types/Page.type';

const PersonalInfoPage: NextPageWithAuth<StaticProps<IPersonalInfo>> = (): ReactElement => {
  return (
    <Layout title={'Personal info'} description={'Personal info page'}>
      <PersonalInfo/>
    </Layout>
  );
};

export async function getStaticProps(): Promise<StaticPropsResponse<IPersonalInfo>> {
  const payload: IPersonalInfo = await fetchPersonalInfo();

  return {
    props: { payload },
    revalidate: 30,
  };
}

export default PersonalInfoPage;
