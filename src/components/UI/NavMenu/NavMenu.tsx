import React, { FC, ReactElement } from 'react';
import Link from 'next/link';
import { Button, Stack } from '@chakra-ui/react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { firebaseAuth } from '@/firebase';
import { router } from '@/router/Router';
import { useRouter } from 'next/router';
import { PublicRoutePath } from '@/router/Routes.enum';

const NavMenu: FC = (): ReactElement => {
  const [signOut, loading] = useSignOut(firebaseAuth);
  const nRouter = useRouter();

  const logout = async (): Promise<void> => {
    try {
      await signOut();
      await nRouter.push(PublicRoutePath.LOGIN);
    } catch (e) {
      console.error('logout error: ', e);
    }
  };

  return (
    <Stack w={'full'} direction={'row'} alignItems={'center'} p={4} mb={4} boxShadow={'md'}>
      <Stack w={'full'} direction={'row'} alignItems={'center'} justifyContent={'center'} mr={4}>
        {
          router.map((rout) => {
            return <Link key={rout.name} href={rout.href}>
              <Button variant={'ghost'}>
                {rout.name}
              </Button>
            </Link>;
          })
        }
      </Stack>

      <Button onClick={() => logout()} isLoading={loading} variant={'ghost'}>Log out</Button>
    </Stack>
  );
};

export default NavMenu;
