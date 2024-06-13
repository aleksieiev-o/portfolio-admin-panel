import {ReactElement} from 'react';
import Layout from '@/components/layout/Layout';
import Socials from '@/components/views/Socials/Socials';
import {
  StaticProps,
  StaticPropsResponse,
} from '@/shared/types/StaticProps.type';
import {ISocial} from 'my-portfolio-types';
import {NextPageWithAuth} from '@/shared/types/Page.type';
import {fetchSocialsList} from '@/services/socialsList.service';

const SocialsPage: NextPageWithAuth<StaticProps<Array<ISocial>>> = ({
  payload,
}): ReactElement => {
  return (
    <Layout title={'Socials'} description={'Socials page'}>
      <Socials payload={payload} />
    </Layout>
  );
};

export async function getStaticProps(): Promise<
  StaticPropsResponse<Array<ISocial>>
> {
  const payload: Array<ISocial> = await fetchSocialsList();

  return {
    props: {payload},
    revalidate: 1,
  };
}

SocialsPage.withAuth = true;

export default SocialsPage;
