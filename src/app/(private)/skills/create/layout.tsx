import {Metadata} from 'next';
import {createAppMetaData} from '@/shared/createAppMetaData';
import {FC, PropsWithChildren, ReactElement} from 'react';
import AppContentWrapper from '@/widgets/AppContentWrapper';
import {RouteName} from '@/shared/router/Routes.enum';
import {APP_DESCRIPTION} from '@/shared/appConstants';

export const metadata: Metadata = createAppMetaData({
  title: RouteName.SKILLS_CREATE,
  description: APP_DESCRIPTION,
});

const SkillsCreateLayout: FC<PropsWithChildren> = ({children}): ReactElement => {
  return <AppContentWrapper>{children}</AppContentWrapper>;
};

export default SkillsCreateLayout;
