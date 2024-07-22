import React, {FC, PropsWithChildren, ReactElement} from 'react';
import AppHeader from '@/widgets/appHeader/AppHeader';
import {isUserAuthenticated} from '@/lib/firebase/firebase-admin';
import {redirect} from 'next/navigation';
import {RoutePath} from '@/shared/router/Routes.enum';

const Layout: FC<PropsWithChildren> = async ({children}): Promise<ReactElement> => {
  if (await isUserAuthenticated()) {
    redirect(RoutePath.PERSONAL_INFO);
  }

  return (
    <div className={'flex h-full w-full flex-col items-start justify-start overflow-hidden'}>
      <AppHeader variant={'auth'} />

      {children}
    </div>
  );
};

export default Layout;
