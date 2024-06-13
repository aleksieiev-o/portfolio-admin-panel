import React, {FC, PropsWithChildren, ReactElement} from 'react';
import {Container, Stack} from '@chakra-ui/react';

const BaseContentHeaderContainer: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  return (
    <Stack direction={'row'} w={'full'} justifyContent={'center'}>
      <Container maxWidth={'5xl'} centerContent={true}>
        <Stack
          direction={'column'}
          w={'full'}
          alignItems={'center'}
          spacing={4}
          pb={2}
        >
          {children}
        </Stack>
      </Container>
    </Stack>
  );
};

export default BaseContentHeaderContainer;
