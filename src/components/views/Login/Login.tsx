import React, { FC, ReactElement, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Icon, IconButton, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Login: FC = (): ReactElement => {
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const handleClick = () => setPasswordVisibility(!passwordVisibility);

  return (
    <Stack w={'full'} h={'full'} alignItems={'center'} justifyContent={'center'} p={4}>
      <Box boxShadow={'md'}>
        <form id={'login-form'}>
          <Stack direction={'column'} alignItems={'center'} justifyContent={'center'} p={4} spacing={4}>
            <Text fontSize={20} fontWeight={700}>Authorization</Text>

            <FormControl isRequired>
              <FormLabel>E-mail</FormLabel>

              <Input type={'email'} placeholder={'E-mail'}/>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>

              <InputGroup>
                <Input type={passwordVisibility ? 'text' : 'password'} placeholder={'Password'}/>

                <InputRightElement>
                  <IconButton icon={<Icon as={passwordVisibility ? VisibilityOffIcon : VisibilityIcon}/>} onClick={handleClick} aria-label={'Toggle password visibility'}/>
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
