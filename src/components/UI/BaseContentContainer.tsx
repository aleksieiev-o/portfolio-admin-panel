import React, { FC, PropsWithChildren, ReactElement } from 'react';
import { Container, Stack } from '@chakra-ui/react';

const BaseContentContainer: FC<PropsWithChildren> = ({children}): ReactElement => {
  return (
    <Stack direction={'row'} w={'full'} h={'full'} justifyContent={'center'} overflowY={'auto'}>
      <Container maxWidth={'5xl'} h={'full'} centerContent={true}>
        <Stack direction={'column'} w={'full'} alignItems={'center'} spacing={4}>
          {children}
        </Stack>
      </Container>
    </Stack>
  );
};

export default BaseContentContainer;
