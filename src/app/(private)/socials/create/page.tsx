import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import {getCurrentUser} from '@/lib/firebase/firebase-admin';
import SocialsCreate from '@/widgets/socials/SocialsCreate';
import ScreenNotAvailable from '@/shared/widgets/ScreenNotAvailable';

const SocialsCreatePage: FC = async (): Promise<ReactElement> => {
  const currentUser = await getCurrentUser();

  return <ScrollContentWrapper>{currentUser ? <SocialsCreate /> : <ScreenNotAvailable />}</ScrollContentWrapper>;
};

export default SocialsCreatePage;
