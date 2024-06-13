import {ReactElement} from 'react';
import {NextPage} from 'next';
import SimpleLayout from '@/components/layout/SimpleLayout';
import Login from '@/components/views/Login/Login';

const LoginPage: NextPage = (): ReactElement => {
  return (
    <SimpleLayout title={'Login'} description={'Login page'}>
      <Login />
    </SimpleLayout>
  );
};

export default LoginPage;
