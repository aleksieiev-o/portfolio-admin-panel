import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import {getCurrentUser} from '@/lib/firebase/firebase-admin';
import SkillsCreate from '@/widgets/skills/SkillsCreate';
import ScreenNotAvailable from '@/shared/widgets/ScreenNotAvailable';

const SkillsCreatePage: FC = async (): Promise<ReactElement> => {
  const currentUser = await getCurrentUser();

  return <ScrollContentWrapper>{currentUser ? <SkillsCreate /> : <ScreenNotAvailable />}</ScrollContentWrapper>;
};

export default SkillsCreatePage;
