import React, { FC, ReactElement } from 'react';
import Link from 'next/link';
import { Button, Stack } from '@chakra-ui/react';
import { router } from '@/shared/Router';

const NavMenu: FC = (): ReactElement => {
  return (
    <Stack w={'full'} direction={'row'} alignItems={'center'} mb={4}>
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

      <Button variant={'ghost'}>Log out</Button>
    </Stack>
  );
};

export default NavMenu;
