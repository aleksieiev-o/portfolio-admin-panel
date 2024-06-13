import {ReactElement} from 'react';
import {NextPage} from 'next';
import SimpleLayout from '@/components/layout/SimpleLayout';
import {Stack, Text} from '@chakra-ui/react';
import GoHomeButton from '@/components/UI/GoHome.button';

const ServerErrorPage: NextPage = (): ReactElement => {
  return (
    <SimpleLayout title={'Internal server error'}>
      <Stack
        direction={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={4}
        h={'full'}
        w={'full'}
      >
        <Text>Internal server error</Text>

        <GoHomeButton />
      </Stack>
    </SimpleLayout>
  );
};

export default ServerErrorPage;
