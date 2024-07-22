'use client';

import React, {FC, ReactElement, useContext} from 'react';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {RouteName, RoutePath} from '@/shared/router/Routes.enum';
import {LogIn} from 'lucide-react';
import {Skeleton} from '@/components/ui/skeleton';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';

const AuthStateChangeButton: FC = (): ReactElement => {
  const {user, loading} = useContext(AppAuthContext);

  return (
    <>
      {!user && (
        <>
          {loading ? (
            <Skeleton className={'h-12 w-12'} />
          ) : (
            <Link href={RoutePath.SIGN_IN}>
              <Button variant={'ghost'} size="icon" title={RouteName.SIGN_IN}>
                <LogIn className={'h-[1.7rem] w-[1.7rem]'} />
              </Button>
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default AuthStateChangeButton;
