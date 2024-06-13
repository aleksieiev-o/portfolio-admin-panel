import React, {FC, ReactElement} from 'react';
import {Stack, Text} from '@chakra-ui/react';

const Loader: FC = (): ReactElement => {
  return (
    <Stack
      w={'full'}
      h={'full'}
      alignItems={'center'}
      justifyContent={'center'}
      overflow={'hidden'}
    >
      <Text as={'b'} fontSize={20}>
        Loading...
      </Text>
    </Stack>
  );
};

export default Loader;
