import React, { FC, ReactElement, useState } from 'react';
import BaseContentContainer from '@/components/UI/BaseContentContainer';
import { Button, FormControl, Input, Stack, Switch, FormLabel } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { createSkill } from '@/services/skills.service';

const CreateSkill: FC = (): ReactElement => {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [visibility, setVisibility] = useState<boolean>(true);
  const [experience, setExperience] = useState<string>('');
  const [color, setColor] = useState<string>('#777777');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateSkill = async (e) => {
    e.preventDefault();

    if (title.length && experience.length) {
      setLoading(true);

      await createSkill({
        title,
        visibility,
        experience: `${experience}%`,
        color,
      });

      await goBack();
    }
  };

  const goBack = async () => {
    await router.back();
  };

  return (
    <BaseContentContainer>
      <form id={'create-skill'} style={{ width: '100%' }} onSubmit={(e) => handleCreateSkill(e)}>
        <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} w={'full'} overflow={'hidden'} spacing={4}>
          <Stack mb={6}>
            <Button onClick={() => goBack()}>Back</Button>
          </Stack>

          <FormControl>
            <FormLabel>Skill title:</FormLabel>

            <Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              isDisabled={loading}
              type={'text'}/>
          </FormControl>

          <FormControl>
            <FormLabel>Skill experience:</FormLabel>

            <Input
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              isDisabled={loading}
              type={'number'}/>
          </FormControl>

          <FormControl>
            <FormLabel>Skill color:</FormLabel>

            <Input
              onChange={(e) => setColor(e.target.value)}
              value={color}
              type={'color'}
              isDisabled={loading}/>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor={'skill-visibility'}>Skill visibility:</FormLabel>

            <Switch
              onChange={() => setVisibility(!visibility)}
              isChecked={visibility}
              id={'skill-visibility'}
              isDisabled={loading}
              colorScheme={'teal'}/>
          </FormControl>

          <Button type={'submit'} isLoading={loading} colorScheme={'teal'} mt={6}>Create</Button>
        </Stack>
      </form>
    </BaseContentContainer>
  );
};

export default CreateSkill;
