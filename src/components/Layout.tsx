import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { IMeta } from '@/components/meta/Meta.interface';
import Meta from '@/components/meta/Meta';
import { Stack } from '@chakra-ui/react';
import NavMenu from '@/components/layout/NavMenu/NavMenu';

const Layout: FC<PropsWithChildren<IMeta>> = (props): ReactElement => {
  const {children, title, description} = props;

  return (
    <Meta
      title={title}
      description={description || ''}>
      <Stack w={'full'} h={'full'} overflow={'hidden'} p={4}>
        <NavMenu/>

        {children}
      </Stack>
    </Meta>
  );
};

export default Layout;
