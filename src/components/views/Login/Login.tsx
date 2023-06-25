import React, { FC, FormEvent, ReactElement, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Icon, IconButton, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { firebaseAuth } from '@/firebase';
import { useRouter } from 'next/router';
import { ProtectedRoutePath } from '@/router/Routes.enum';

const Login: FC = (): ReactElement => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [signInWithEmailAndPassword, loading] = useSignInWithEmailAndPassword(firebaseAuth);
  const router = useRouter();

  const handlePasswordVisibility = () => setPasswordVisibility(!passwordVisibility);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(email, password);

      if (!loading && user) {
        await router.push(ProtectedRoutePath.PERSONAL_INFO);
      }
    } catch (e) {
      console.error('login error: ', e);
    }
  };

  return (
    <Stack w={'full'} h={'full'} alignItems={'center'} justifyContent={'center'} p={4}>
      <Box boxShadow={'md'}>
        <form id={'login-form'} onSubmit={handleSubmit}>
          <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} p={4} spacing={4}>
            <Text fontSize={20} fontWeight={700}>Authorization</Text>

            <FormControl isRequired>
              <FormLabel>E-mail</FormLabel>

              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type={'email'}
                name={'email'}
                placeholder={'E-mail'}/>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>

              <InputGroup>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={passwordVisibility ? 'text' : 'password'}
                  name={'password'}
                  placeholder={'Password'}/>

                <InputRightElement>
                  <IconButton
                    icon={<Icon as={passwordVisibility ? VisibilityOffIcon : VisibilityIcon}/>}
                    onClick={handlePasswordVisibility}
                    aria-label={'Toggle password visibility'}/>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button form={'login-form'} type={'submit'} variant={'outline'}>Login</Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};

export default Login;
