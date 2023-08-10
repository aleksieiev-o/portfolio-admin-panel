import React, { FC, ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import { ProtectedRoutePath } from '@/router/Routes.enum';
import { createProject } from '@/services/projects.service';
import { Badge, Button, FormControl, FormLabel, Input, Stack, Switch, Textarea, Image } from '@chakra-ui/react';
import BaseContentContainer from '@/components/UI/Containers/BaseContent.container';
import { useLoading } from '@/hooks/useLoading';
import { updateById } from '@/services/data.service';
import { EndpointsList } from '@/shared/Endpoints.enum';
import {TypeCreateProjectDto, TypeUpdateProjectDto} from '@/shared/dto/createSkill.dto';
import {IProject} from 'my-portfolio-types';
import {StaticProps} from '@/shared/types/StaticProps.type';

interface Props extends StaticProps<IProject | null> {
  type: 'create' | 'update';
}

const ProjectForm: FC<Props> = (props): ReactElement => {
  const {type, payload: projectPayload} = props;
  const router = useRouter();
  const {isLoading, setIsLoading} = useLoading();
  const [title, setTitle] = useState<string>(projectPayload?.title || '');
  const [description, setDescription] = useState<string>(projectPayload?.description || '');
  const [mainTechnology, setMainTechnology] = useState<string>(projectPayload?.mainTechnology || '');
  const [preparedTechnology, setPreparedTechnology] = useState<string>('');
  const [technologies, setTechnologies] = useState<Array<string>>(projectPayload?.technologies || []);
  const [repository, setRepository] = useState<string>(projectPayload?.repository || '');
  const [demo, setDemo] = useState<string>(projectPayload?.demo || '');
  // TODO the date value save in two different variant. If I create project as 8/2/2023 and if I update project with releaseDate update as 2023-08-01
  const [releaseDate, setReleaseDate] = useState<string>(projectPayload?.releaseDate || '');
  const [file, setFile] = useState<File>();
  const [visibility, setVisibility] = useState<boolean>(projectPayload?.visibility || true);

  const handleSetTechnology = () => {
    if (preparedTechnology.length) {
      setTechnologies([...technologies, preparedTechnology]);
      setPreparedTechnology('');
    }
  };

  const handleFormSubmit = async (e, action: typeof type) => {
    e.preventDefault();

    if (title.length &&
      description.length &&
      mainTechnology.length &&
      repository.length &&
      demo.length &&
      releaseDate.length &&
      file) {
      setIsLoading(true);

      const createProjectDto: TypeCreateProjectDto = {
        title,
        visibility,
        description,
        mainTechnology,
        releaseDate,
        technologies,
        repository,
        demo,
        file,
      };

      const updateProjectDto: TypeUpdateProjectDto = {
        title,
        visibility,
        description,
        mainTechnology,
        releaseDate,
        technologies,
        repository,
        demo,
        file,
        fileSrc: projectPayload?.fileSrc || '',
      };

      if (action === 'create') {
        await createProject(createProjectDto);
        // TODO After create project I don't go to update this project. Page update required
      } else if (action === 'update') {
        await updateById<TypeUpdateProjectDto>(updateProjectDto, EndpointsList.PROJECTS, router.query.id as string);
      }

      await router.push(ProtectedRoutePath.PROJECTS);
    }
  };

  const handleGoBack = async () => {
    await router.back();
  };

  return (
    <BaseContentContainer>
      <form style={{ width: '100%' }} onSubmit={(e) => handleFormSubmit(e, type)}>
        <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} w={'full'} spacing={4}>
          <Stack mb={6}>
            <Button onClick={() => handleGoBack()}>Back</Button>
          </Stack>

          <FormControl>
            <FormLabel>Project title:</FormLabel>

            <Input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              isDisabled={isLoading}
              type={'text'}/>
          </FormControl>

          <FormControl>
            <FormLabel>Project description:</FormLabel>

            <Textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              isDisabled={isLoading}
              size={'md'}
              type={'text'}/>
          </FormControl>

          <FormControl>
            <FormLabel>Project repository:</FormLabel>

            <Input
              onChange={(e) => setRepository(e.target.value)}
              value={repository}
              isDisabled={isLoading}
              type={'text'}/>
          </FormControl>

          <FormControl>
            <FormLabel>Project demo:</FormLabel>

            <Input
              onChange={(e) => setDemo(e.target.value)}
              value={demo}
              isDisabled={isLoading}
              type={'text'}/>
          </FormControl>

          <FormControl>
            <FormLabel>Project release date:</FormLabel>

            <Input
              onChange={(e) => setReleaseDate(e.target.value)}
              value={releaseDate}
              isDisabled={isLoading}
              type={'date'}/>
          </FormControl>

          <FormControl>
            <FormLabel>Project main technology:</FormLabel>

            <Input
              onChange={(e) => setMainTechnology(e.target.value)}
              value={mainTechnology}
              isDisabled={isLoading}
              type={'text'}/>
          </FormControl>

          <Stack direction={'column'} alignItems={'start'} justifyContent={'center'} w={'full'} spacing={4}>
            <FormControl>
              <FormLabel>Project technologies list:</FormLabel>

              <Stack direction={'row'} alignItems={'start'} justifyContent={'center'} w={'full'} spacing={4}>
                <Input
                  onChange={(e) => setPreparedTechnology(e.target.value)}
                  value={preparedTechnology}
                  isDisabled={isLoading}
                  type={'text'}/>

                <Button onClick={() => handleSetTechnology()} colorScheme={'telegram'} isDisabled={isLoading}>Add</Button>
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

            {
              projectPayload?.fileSrc &&
              <Image src={projectPayload?.fileSrc || ''} maxW={320} objectFit={'contain'} alt={'Project preview'} mb={4}/>
            }

            <Input
              onChange={(e) => setFile(e.target?.files[0])}
              multiple={false}
              accept={'.jpg, .jpeg, .png'}
              isDisabled={isLoading}
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
              isDisabled={isLoading}
              colorScheme={'teal'}/>
          </FormControl>

          <Button type={'submit'} isLoading={isLoading} colorScheme={'teal'} mt={6}>
            {type === 'create' ? 'Create' : 'Save'}
          </Button>
        </Stack>
      </form>
    </BaseContentContainer>
  );
};

export default ProjectForm;
