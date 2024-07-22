import React, {FC, PropsWithChildren, ReactElement} from 'react';
import AppHeader from '@/widgets/appHeader/AppHeader';
import {getCurrentUser} from '@/lib/firebase/firebase-admin';
import {redirect} from 'next/navigation';
import {RoutePath} from '@/shared/router/Routes.enum';

const Layout: FC<PropsWithChildren> = async ({children}): Promise<ReactElement> => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect(RoutePath.SIGN_IN);
  }

  return (
    <div className={'flex h-full w-full flex-col items-start justify-start overflow-hidden'}>
      <AppHeader variant={'private'} />

      {children}
    </div>
  );
};

export default Layout;
