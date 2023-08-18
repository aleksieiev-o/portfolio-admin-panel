import React, { FC, ReactElement, useState } from 'react';
import BaseContentContainer from '@/components/UI/Containers/BaseContent.container';
import { Button, FormControl, Input, Stack, Switch, FormLabel } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { createSkill } from '@/services/skills.service';
import { ProtectedRoutePath } from '@/router/Routes.enum';
import { useLoading } from '@/hooks/useLoading';

const CreateSkill: FC = (): ReactElement => {
  const router = useRouter();
  const {isLoading, setIsLoading} = useLoading();
  const [title, setTitle] = useState<string>('');
  const [visibility, setVisibility] = useState<boolean>(true);
  const [experience, setExperience] = useState<string>('');
  const [color, setColor] = useState<string>('#777777');
  const [position, setPosition] = useState<string>('');

  const handleCreateSkill = async (e: any) => {
    e.preventDefault();

    if (title.length && experience.length) {
      setIsLoading(true);

      await createSkill({
        title,
        visibility,
        experience: `${experience}%`,
        color,
        position,
      });

      await router.push(ProtectedRoutePath.SKILLS);
    }
  };

  const goBack = async () => {
    await router.back();
  };

  return (
    <BaseContentContainer>
      <form id={'create-skill'} style={{ width: '100%' }} onSubmit={(e) => handleCreateSkill(e)}>
        <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} w={'full'} spacing={4}>
          <Stack mb={6}>
            <Button onClick={() => goBack()}>Back</Button>
          </Stack>

          <FormControl>
            <FormLabel>Skill title:</FormLabel>

            <Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              isDisabled={isLoading}
              type={'text'}/>
          </FormControl>

          <FormControl>
            <FormLabel>Skill experience:</FormLabel>

            <Input
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              isDisabled={isLoading}
              type={'number'}/>
          </FormControl>

          <FormControl>
            <FormLabel>Skill color:</FormLabel>

            <Input
              onChange={(e) => setColor(e.target.value)}
              value={color}
              type={'color'}
              isDisabled={isLoading}/>
          </FormControl>

          <FormControl>
            <FormLabel>Skill position in list:</FormLabel>

            <Input
              onChange={(e) => setPosition(e.target.value)}
              value={position}
              type={'text'}
              isDisabled={isLoading}/>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor={'skill-visibility'}>Skill visibility:</FormLabel>

            <Switch
              onChange={() => setVisibility(!visibility)}
              isChecked={visibility}
              id={'skill-visibility'}
              isDisabled={isLoading}
              colorScheme={'teal'}/>
          </FormControl>

          <Button type={'submit'} isLoading={isLoading} colorScheme={'teal'} mt={6}>Create</Button>
        </Stack>
      </form>
    </BaseContentContainer>
  );
};

export default CreateSkill;
