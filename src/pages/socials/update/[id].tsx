import { NextPageWithAuth } from '@/shared/types/Page.type';
import { ReactElement } from 'react';
import Layout from '@/components/layout/Layout';
import { StaticProps, StaticPropsResponse } from '@/shared/types/StaticProps.type';
import { ISocial } from 'my-portfolio-types';
import { fetchById } from '@/services/data.service';
import { EndpointsList } from '@/shared/Endpoints.enum';
import { GetStaticPaths, GetStaticProps } from 'next';
import {fetchSocialsList} from '@/services/socialsList.service';
import SocialCardForm from '@/components/views/Socials/SocialCardForm';

const UpdateSocialPage: NextPageWithAuth<StaticProps<ISocial>> = ({payload}): ReactElement => {
  return (
    <Layout title={'Update social card'} description={'Update social card page'}>
      <SocialCardForm type={'update'} payload={payload}/>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const payload: Array<ISocial> = await fetchSocialsList();
  const paths = payload.map((item) => ({ params: { id: item.id } }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<StaticProps<ISocial>> = async (context): Promise<StaticPropsResponse<ISocial>> => {
  try {
    const id = context.params?.id as string;
    const payload: ISocial = await fetchById(EndpointsList.SOCIALS, id);

    return {
      props: { payload },
      revalidate: 10,
    };
  } catch (err) {
    return Promise.reject({} as ISocial);
  }
};

UpdateSocialPage.withAuth = true;

export default UpdateSocialPage;
