import {ReactElement} from 'react';
import { NextPage } from 'next';
import SimpleLayout from '@/components/layout/SimpleLayout';
import { Stack, Text } from '@chakra-ui/react';
import GoHomeButton from '@/components/UI/GoHome.button';

const NotFoundPage: NextPage = (): ReactElement => {
  return (
    <SimpleLayout title={'Page not found'}>
      <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} spacing={4} h={'full'} w={'full'}>
        <Text>Page not found</Text>

        <GoHomeButton/>
      </Stack>
    </SimpleLayout>
  );
};

export default NotFoundPage;
