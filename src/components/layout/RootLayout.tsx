import React, { FC, PropsWithChildren, ReactElement, useContext } from 'react';
import { IMeta } from '@/components/meta/Meta.interface';
import Meta from '@/components/meta/Meta';
import { Stack } from '@chakra-ui/react';
import Loader from '@/components/UI/Loader';
import { AuthContext } from '@/providers/AuthContext.provider';

const RootLayout: FC<PropsWithChildren<IMeta>> = (props): ReactElement => {
  const {children, title, description} = props;

  const {currentUser, loading, authState} = useContext(AuthContext);

  return (
    <Meta title={title} description={description || ''}>
      <Stack w={'full'} h={'full'} overflow={'hidden'} p={4}>
        {
          loading ? <Loader/> : <>{children}</>
        }
      </Stack>
    </Meta>
  );
};

export default RootLayout;
