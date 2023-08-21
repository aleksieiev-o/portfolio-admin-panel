import { ReactElement } from 'react';
import { NextPage } from 'next';
import SimpleLayout from '@/components/layout/SimpleLayout';
import { useRouter } from 'next/router';
import { ProtectedRoutePath } from '@/router/Routes.enum';
import { Button, Stack, Text } from '@chakra-ui/react';

const NotFoundPage: NextPage = (): ReactElement => {
  const router = useRouter();

  return (
    <SimpleLayout title={'Page not found'}>
      <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} spacing={4} h={'full'} w={'full'}>
        <Text>Page not found</Text>

        <Button onClick={() => router.push(ProtectedRoutePath.PERSONAL_INFO)} boxShadow={'md'}>
          Go home
        </Button>
      </Stack>
    </SimpleLayout>
  );
};

export default NotFoundPage;
