import React, { FC, ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import { ProtectedRoutePath } from '@/router/Routes.enum';
import { createProject } from '@/services/projects.service';
import { Badge, Button, FormControl, FormLabel, Input, Stack, Switch, Textarea } from '@chakra-ui/react';
import BaseContentContainer from '@/components/UI/Containers/BaseContent.container';

const CreateProject: FC = (): ReactElement => {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [mainTechnology, setMainTechnology] = useState<string>('');
  const [preparedTechnology, setPreparedTechnology] = useState<string>('');
  const [technologies, setTechnologies] = useState<Array<string>>([]);
  const [repository, setRepository] = useState<string>('');
  const [demo, setDemo] = useState<string>('');
  const [releaseDate, setReleaseDate] = useState<string>('');
  const [file, setFile] = useState<File>();
  const [visibility, setVisibility] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSetTechnology = () => {
    if (preparedTechnology.length) {
      setTechnologies([...technologies, preparedTechnology]);
      setPreparedTechnology('');
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    if (title.length &&
      description.length &&
      mainTechnology.length &&
      repository.length &&
      demo.length &&
      releaseDate.length &&
      file) {
      setLoading(true);

      await createProject({
        title,
        visibility,
        description,
        mainTechnology,
        releaseDate,
        technologies,
        repository,
        demo,
        file,
      });

      await router.push(ProtectedRoutePath.PROJECTS);
    }
  };

  const goBack = async () => {
    await router.back();
  };

  return (
    <BaseContentContainer>
      <form id={'create-project'} style={{ width: '100%' }} onSubmit={(e) => handleCreateProject(e)}>
        <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} w={'full'} spacing={4}>
          <Stack mb={6}>
            <Button onClick={() => goBack()}>Back</Button>
          </Stack>

          <FormControl>
            <FormLabel>Project title:</FormLabel>

            <Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              isDisabled={loading}
              type={'text'}/>
          </FormControl>

          <FormControl>
            <FormLabel>Project description:</FormLabel>

            <Textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              isDisabled={loading}
              size={'md'}
              type={'text'}/>
          </FormControl>

          <FormControl>
            <FormLabel>Project repository:</FormLabel>

            <Input
              onChange={(e) => setRepository(e.target.value)}
              value={repository}
              isDisabled={loading}
              type={'text'}/>
          </FormControl>

          <FormControl>
            <FormLabel>Project demo:</FormLabel>

            <Input
              onChange={(e) => setDemo(e.target.value)}
              value={demo}
              isDisabled={loading}
              type={'text'}/>
          </FormControl>

          <FormControl>
            <FormLabel>Project release date:</FormLabel>

            <Input
              onChange={(e) => setReleaseDate(e.target.value)}
              value={releaseDate}
              isDisabled={loading}
              type={'date'}/>
          </FormControl>

          <FormControl>
            <FormLabel>Project main technology:</FormLabel>

            <Input
              onChange={(e) => setMainTechnology(e.target.value)}
              value={mainTechnology}
              isDisabled={loading}
              type={'text'}/>
          </FormControl>

          <Stack direction={'column'} alignItems={'start'} justifyContent={'center'} w={'full'} spacing={4}>
            <FormControl>
              <FormLabel>Project technologies list:</FormLabel>

              <Stack direction={'row'} alignItems={'start'} justifyContent={'center'} w={'full'} spacing={4}>
                <Input
                  onChange={(e) => setPreparedTechnology(e.target.value)}
                  value={preparedTechnology}
                  isDisabled={loading}
                  type={'text'}/>

                <Button onClick={() => handleSetTechnology()} colorScheme={'telegram'} isDisabled={loading}>Add technology</Button>
              </Stack>
            </FormControl>

            {
              technologies.length && <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} w={'full'} spacing={4}>
                {
                  technologies.map((item) => (
                    <Badge key={item} p={2} colorScheme={'telegram'}>{item}</Badge>
                  ))
                }
              </Stack>
            }
          </Stack>

          <FormControl>
            <FormLabel>Project preview:</FormLabel>

            <Input
              onChange={(e) => setFile(e.target?.files[0])}
              multiple={false}
              accept={'.jpg, .jpeg, .png'}
              isDisabled={loading}
              type={'file'}
              pl={1}
              border={'none'}/>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor={'project-visibility'}>Project visibility:</FormLabel>

            <Switch
              onChange={() => setVisibility(!visibility)}
              isChecked={visibility}
              id={'project-visibility'}
              isDisabled={loading}
              colorScheme={'teal'}/>
          </FormControl>

          <Button type={'submit'} isLoading={loading} colorScheme={'teal'} mt={6}>Create</Button>
        </Stack>
      </form>
    </BaseContentContainer>
  );
};

export default CreateProject;
