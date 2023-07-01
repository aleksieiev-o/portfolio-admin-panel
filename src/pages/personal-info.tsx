import { ReactElement } from 'react';
import Layout from '@/components/layout/Layout';
import PersonalInfo from '@/components/views/PersonalInfo/PersonalInfo';
import { StaticProps, StaticPropsResponse } from '@/shared/types/StaticProps.type';
import { IPersonalInfo } from 'my-portfolio-types';
import { fetchPersonalInfo } from '@/services/personalInfo.service';
import { NextPageWithAuth } from '@/shared/types/Page.type';

const PersonalInfoPage: NextPageWithAuth<StaticProps<IPersonalInfo>> = ({payload}): ReactElement => {
  return (
    <Layout title={'Personal info'} description={'Personal info page'}>
      <PersonalInfo payload={payload}/>
    </Layout>
  );
};

export async function getStaticProps(): Promise<StaticPropsResponse<IPersonalInfo>> {
  const payload: IPersonalInfo = await fetchPersonalInfo();

  return {
    props: { payload },
    revalidate: 10,
  };
}

export default PersonalInfoPage;
