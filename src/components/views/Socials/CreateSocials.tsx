import React, { FC, ReactElement, useState } from 'react';
import { Button, FormControl, FormLabel, Input, Stack, Switch } from '@chakra-ui/react';
import BaseContentContainer from '@/components/UI/Containers/BaseContent.container';
import { useRouter } from 'next/router';
import { createSocial } from '@/services/socialsList.service';
import { ProtectedRoutePath } from '@/router/Routes.enum';
import { useLoading } from '@/hooks/useLoading';

const CreateSocials: FC = (): ReactElement => {
  const router = useRouter();
  const {isLoading, setIsLoading} = useLoading();
  const [title, setTitle] = useState<string>('');
  const [visibility, setVisibility] = useState<boolean>(true);
  const [url, setUrl] = useState<string>('');

  const handleCreateSocial = async (e: any) => {
    e.preventDefault();

    if (title.length && url.length) {
      setIsLoading(true);

      await createSocial({
        title,
        visibility,
        url,
      });

      await router.push(ProtectedRoutePath.SOCIALS);
    }
  };

  const goBack = async () => {
    await router.back();
  };

  return (
    <BaseContentContainer>
      <form id={'create-social'} style={{ width: '100%' }} onSubmit={(e) => handleCreateSocial(e)}>
        <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} w={'full'} spacing={4}>
          <Stack mb={6}>
            <Button onClick={() => goBack()}>Back</Button>
          </Stack>

          <FormControl>
            <FormLabel>Social title:</FormLabel>

            <Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              isDisabled={isLoading}
              type={'text'}/>
          </FormControl>

          <FormControl>
            <FormLabel>Social URL:</FormLabel>

            <Input
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              isDisabled={isLoading}
              type={'text'}/>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor={'social-visibility'}>Social visibility:</FormLabel>

            <Switch
              onChange={() => setVisibility(!visibility)}
              isChecked={visibility}
              id={'social-visibility'}
              isDisabled={isLoading}
              colorScheme={'teal'}/>
          </FormControl>

          <Button type={'submit'} isLoading={isLoading} colorScheme={'teal'} mt={6}>Create</Button>
        </Stack>
      </form>
    </BaseContentContainer>
  );
};

export default CreateSocials;
