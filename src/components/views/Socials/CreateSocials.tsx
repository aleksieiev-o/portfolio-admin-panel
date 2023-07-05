import React, { FC, ReactElement, useContext, useState } from 'react';
import { Button, FormControl, FormLabel, Input, Stack, Switch } from '@chakra-ui/react';
import BaseContentContainer from '@/components/UI/Containers/BaseContent.container';
import { useRouter } from 'next/router';
import { createSocial } from '@/services/socialsList.service';
import { ProtectedRoutePath } from '@/router/Routes.enum';
import { LoadingContext } from '@/providers/LoadingContext.provider';

const CreateSocials: FC = (): ReactElement => {
  const router = useRouter();
  const {globalLoading, setGlobalLoading} = useContext(LoadingContext);
  const [title, setTitle] = useState<string>('');
  const [visibility, setVisibility] = useState<boolean>(true);
  const [url, setUrl] = useState<string>('');

  const handleCreateSocial = async (e) => {
    e.preventDefault();

    if (title.length && url.length) {
      setGlobalLoading(true);

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
              isDisabled={globalLoading}
              type={'text'}/>
          </FormControl>

          <FormControl>
            <FormLabel>Social URL:</FormLabel>

            <Input
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              isDisabled={globalLoading}
              type={'text'}/>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor={'social-visibility'}>Social visibility:</FormLabel>

            <Switch
              onChange={() => setVisibility(!visibility)}
              isChecked={visibility}
              id={'social-visibility'}
              isDisabled={globalLoading}
              colorScheme={'teal'}/>
          </FormControl>

          <Button type={'submit'} isLoading={globalLoading} colorScheme={'teal'} mt={6}>Create</Button>
        </Stack>
      </form>
    </BaseContentContainer>
  );
};

export default CreateSocials;
