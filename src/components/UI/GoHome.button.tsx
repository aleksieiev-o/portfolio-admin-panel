import React, {FC, ReactElement, useContext} from 'react';
import {ProtectedRoutePath, PublicRoutePath} from '@/router/Routes.enum';
import {Button} from '@chakra-ui/react';
import {useRouter} from 'next/router';
import {AuthContext} from '@/providers/AuthContext.provider';

const GoHomeButton: FC = (): ReactElement => {
  const router = useRouter();
  const {currentUser} = useContext(AuthContext);

  return (
    <Button
      onClick={() => router.push(currentUser ? ProtectedRoutePath.PERSONAL_INFO : PublicRoutePath.LOGIN)}
      boxShadow={'md'}>
      Go home
    </Button>
  );
};

export default GoHomeButton;
