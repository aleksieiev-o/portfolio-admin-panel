import { ReactElement } from 'react';
import { NextPage } from 'next';
import SimpleLayout from '@/components/SimpleLayout';
import { useRouter } from 'next/router';
import { RoutePath } from '@/shared/Routes.enum';
import { Button, Stack, Text } from '@chakra-ui/react';

const ServerErrorPage: NextPage = (): ReactElement => {
  const router = useRouter();

  return (
    <SimpleLayout title={'Internal server error'}>
      <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} spacing={4} h={'full'} w={'full'}>
        <Text>Internal server error</Text>

        <Button onClick={() => router.push(RoutePath.PERSONAL_INFO)}>
          Go home
        </Button>
      </Stack>
    </SimpleLayout>
  );
};

export default ServerErrorPage;
