import {ReactElement, useContext} from 'react';
import { NextPage } from 'next';
import SimpleLayout from '@/components/layout/SimpleLayout';
import { useRouter } from 'next/router';
import {ProtectedRoutePath, PublicRoutePath} from '@/router/Routes.enum';
import { Button, Stack, Text } from '@chakra-ui/react';
import {AuthContext} from '@/providers/AuthContext.provider';

const NotFoundPage: NextPage = (): ReactElement => {
  const router = useRouter();
  const {currentUser} = useContext(AuthContext);

  return (
    <SimpleLayout title={'Page not found'}>
      <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} spacing={4} h={'full'} w={'full'}>
        <Text>Page not found</Text>

        <Button
          onClick={() => router.push(currentUser ? ProtectedRoutePath.PERSONAL_INFO : PublicRoutePath.LOGIN)}
          boxShadow={'md'}>
          Go home
        </Button>
      </Stack>
    </SimpleLayout>
  );
};

export default NotFoundPage;
