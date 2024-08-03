import {FC, ReactElement} from 'react';
import ScrollContentWrapper from '@/widgets/ScrollContentWrapper';
import {getCurrentUser} from '@/lib/firebase/firebase-admin';
import ProjectsCreate from '@/widgets/projects/ProjectsCreate';
import ScreenNotAvailable from '@/shared/widgets/ScreenNotAvailable';

const ProjectsPage: FC = async (): Promise<ReactElement> => {
  const currentUser = await getCurrentUser();

  return <ScrollContentWrapper>{currentUser ? <ProjectsCreate /> : <ScreenNotAvailable />}</ScrollContentWrapper>;
};

export default ProjectsPage;
