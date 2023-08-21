import { ReactElement } from 'react';
import Layout from '@/components/layout/Layout';
import PersonalInfo from '@/components/views/PersonalInfo/PersonalInfo';
import { StaticProps, StaticPropsResponse } from '@/shared/types/StaticProps.type';
import { IFile, IPersonalInfo } from 'my-portfolio-types';
import { fetchPersonalInfo } from '@/services/personalInfo.service';
import { NextPageWithAuth } from '@/shared/types/Page.type';
import { fetchBio, fetchMainImage } from '@/services/files.service';
import { IAllPersonalInfo } from '@/shared/types/AllPersonalInfo.interface';

const PersonalInfoPage: NextPageWithAuth<StaticProps<IAllPersonalInfo>> = ({payload}): ReactElement => {
  return (
    <Layout title={'Personal info'} description={'Personal info page'}>
      <PersonalInfo payload={payload}/>
    </Layout>
  );
};

export async function getStaticProps(): Promise<StaticPropsResponse<IAllPersonalInfo>> {
  const personalInfo: IPersonalInfo = await fetchPersonalInfo();
  const mainImage: IFile = await fetchMainImage();
  const bio: IFile = await fetchBio();

  const payload: IAllPersonalInfo = {
    personalInfo,
    mainImage,
    bio,
  };

  return {
    props: { payload },
    revalidate: 10,
  };
}

PersonalInfoPage.withAuth = true;

export default PersonalInfoPage;
