import {RouteName} from '@/shared/router/Routes.enum';
import PageContentHeader from '@/shared/widgets/pageContent/PageContentHeader';
import {FC, ReactElement} from 'react';

const UserSettings: FC = (): ReactElement => {
  return (
    <div className="flex h-full w-full flex-col gap-6 py-6">
      <PageContentHeader pageTitle={RouteName.USER_SETTINGS} />

      <div className="grid w-full grid-cols-1 gap-4 overflow-hidden md:gap-6">Coming soon</div>
    </div>
  );
};

export default UserSettings;
