import React, {FC, PropsWithChildren, ReactElement} from 'react';
import AppHeader from '@/widgets/appHeader/AppHeader';
import {Metadata} from 'next';
import {createAppMetaData} from '@/shared/createAppMetaData';
import {RouteName} from '@/shared/router/Routes.enum';
import {APP_DESCRIPTION} from '@/shared/appConstants';

export const metadata: Metadata = createAppMetaData({
  title: RouteName.HOME,
  description: APP_DESCRIPTION,
});

const Layout: FC<PropsWithChildren> = async ({children}): Promise<ReactElement> => {
  return (
    <div className={'flex h-full w-full flex-col items-start justify-start overflow-hidden'}>
      <AppHeader variant={'public'} />

      {children}
    </div>
  );
};

export default Layout;
