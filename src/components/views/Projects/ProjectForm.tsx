import React, {FC, ReactElement, useMemo, useState} from 'react';
import { useRouter } from 'next/router';
import { ProtectedRoutePath } from '@/router/Routes.enum';
import {createProject, updateProjectById} from '@/services/projects.service';
import {
  Badge,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Switch,
  Textarea,
  Image,
  Text,
  FormErrorMessage, Icon, IconButton, Grid, GridItem
} from '@chakra-ui/react';
import BaseContentContainer from '@/components/UI/Containers/BaseContent.container';
import { useLoading } from '@/hooks/useLoading';
import {TypeCreateProjectDto} from '@/shared/dto/createProject.dto';
import {IProject} from 'my-portfolio-types';
import {StaticProps} from '@/shared/types/StaticProps.type';
import {FormikHelpers, useFormik} from 'formik';
import {mixed, object, string} from 'yup';
import {STRINGS} from '@/locales';
import CloseIcon from '@mui/icons-material/Close';

interface Props extends StaticProps<IProject | null> {
  type: 'create' | 'update';
}

enum UpdateTechnologyListEnum {
  ADD,
  REMOVE,
}

const ProjectForm: FC<Props> = (props): ReactElement => {
  const {type, payload: projectPayload} = props;
  const router = useRouter();
  const {isLoading, setIsLoading} = useLoading();
  const [tempTechnology, setPreparedTechnology] = useState<string>('');

  const initialValues: TypeCreateProjectDto = {
    demo: projectPayload?.demo || '',
    description: projectPayload?.description || '',
    fileSrc: projectPayload?.fileSrc || '',
    mainTechnology: projectPayload?.mainTechnology || '',
    // TODO the date value save in two different variant. If I create project as 8/2/2023 and if I update project with releaseDate update as 2023-08-01
    releaseDate: projectPayload?.releaseDate.slice(0, 10) || '',
    repository: projectPayload?.repository || '',
    position: projectPayload?.position || '',
    technologies: projectPayload?.technologies || [],
    title: projectPayload?.title || '',
    visibility: projectPayload ? projectPayload.visibility : true,
  };

  const validationSchema = useMemo(() => {
    if (type === 'create') {
      return object().shape({
        demo: string().trim().required(STRINGS.requiredField),
        description: string().trim().required(STRINGS.requiredField),
        file: mixed().required(STRINGS.requiredFieldImage),
        mainTechnology: string().trim().required(STRINGS.requiredField),
        releaseDate: string().trim().required(STRINGS.requiredField),
        repository: string().trim().required(STRINGS.requiredField),
        position: string().trim().required(STRINGS.requiredField),
        title: string().trim().required(STRINGS.requiredField),
      });
    }

    return object().shape({
      demo: string().trim().required(STRINGS.requiredField),
      description: string().trim().required(STRINGS.requiredField),
      fileSrc: string().trim().required(STRINGS.requiredField),
      mainTechnology: string().trim().required(STRINGS.requiredField),
      releaseDate: string().trim().required(STRINGS.requiredField),
      repository: string().trim().required(STRINGS.requiredField),
      position: string().trim().required(STRINGS.requiredField),
      title: string().trim().required(STRINGS.requiredField),
    });
  }, [type]);
  
  const handleFormSubmit = async (payload: TypeCreateProjectDto, formikHelpers: FormikHelpers<TypeCreateProjectDto>) => {
    setIsLoading(true);
    
    try {
      if (type === 'create') {
        await createProject(payload);
      } else if (type === 'update') {
        await updateProjectById(payload, router.query.id as string);
      }

      formikHelpers.resetForm();

      await router.push(ProtectedRoutePath.PROJECTS);
    } catch (err) {
      console.warn(err);
    } finally {
      formikHelpers.setSubmitting(false);
      setIsLoading(false);
    }
  };

  const formik = useFormik<TypeCreateProjectDto>({
    initialValues,
    validationSchema,
    onSubmit: handleFormSubmit,
    validateOnBlur: true,
  });

  const { handleSubmit, setFieldValue, values, touched, errors, getFieldProps } = formik;

  const technologiesValue = {...getFieldProps('technologies')}.value;

  const handleSetTechnology = (action: UpdateTechnologyListEnum, technology: string | null) => {
    if (action === UpdateTechnologyListEnum.ADD && tempTechnology.length) {
      setFieldValue('technologies', [...technologiesValue, tempTechnology]);
      setPreparedTechnology('');
    } else if (action === UpdateTechnologyListEnum.REMOVE) {
      setFieldValue('technologies', technologiesValue.filter((item: string) => item !== technology));
    }
  };

  const updateFileInputValue = (files: FileList | null) => {
    if (!files) return;

    setFieldValue('file', files[0]);
  };

  const handleGoBack = async () => {
    await router.back();
  };

  return (
    <BaseContentContainer>
      <form noValidate={true} onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} w={'full'} spacing={4} mb={6}>
          <Button onClick={() => handleGoBack()} boxShadow={'md'}>Back</Button>
        </Stack>

        <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={6} w={'full'}>
          <GridItem>
            <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} w={'full'} spacing={4}>
              <FormControl isRequired={true} isInvalid={Boolean(touched.title && errors.title)}>
                <FormLabel>Project title:</FormLabel>

                <Input
                  isDisabled={isLoading}
                  type={'text'}
                  boxShadow={'md'}
                  {...getFieldProps('title')}/>

                {touched.title && Boolean(errors.title) && <FormErrorMessage>{errors.title}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired={true} isInvalid={Boolean(touched.description && errors.description)}>
                <FormLabel>Project description:</FormLabel>

                <Textarea
                  isDisabled={isLoading}
                  size={'md'}
                  boxShadow={'md'}
                  {...getFieldProps('description')}/>

                {touched.description && Boolean(errors.description) && <FormErrorMessage>{errors.description}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired={true} isInvalid={Boolean(touched.repository && errors.repository)}>
                <FormLabel>Project repository:</FormLabel>

                <Input
                  isDisabled={isLoading}
                  type={'text'}
                  boxShadow={'md'}
                  {...getFieldProps('repository')}/>

                {touched.repository && Boolean(errors.repository) && <FormErrorMessage>{errors.repository}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired={true} isInvalid={Boolean(touched.demo && errors.demo)}>
                <FormLabel>Project demo:</FormLabel>

                <Input
                  isDisabled={isLoading}
                  type={'text'}
                  boxShadow={'md'}
                  {...getFieldProps('demo')}/>

                {touched.demo && Boolean(errors.demo) && <FormErrorMessage>{errors.demo}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired={true} isInvalid={Boolean(touched.releaseDate && errors.releaseDate)}>
                <FormLabel>Project release date:</FormLabel>

                <Input
                  isDisabled={isLoading}
                  type={'date'}
                  boxShadow={'md'}
                  {...getFieldProps('releaseDate')}/>

                {touched.releaseDate && Boolean(errors.releaseDate) && <FormErrorMessage>{errors.releaseDate}</FormErrorMessage>}
              </FormControl>
            </Stack>
          </GridItem>

          <GridItem overflow={'hidden'}>
            <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} w={'full'} spacing={4}>
              <FormControl isRequired={true} isInvalid={Boolean(touched.position && errors.position)}>
                <FormLabel>Project position in list:</FormLabel>

                <Input
                  isDisabled={isLoading}
                  type={'number'}
                  boxShadow={'md'}
                  {...getFieldProps('position')}/>

                {touched.releaseDate && Boolean(errors.releaseDate) && <FormErrorMessage>{errors.releaseDate}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired={true} isInvalid={Boolean(touched.mainTechnology && errors.mainTechnology)}>
                <FormLabel>Project main technology:</FormLabel>

                <Input
                  isDisabled={isLoading}
                  type={'text'}
                  boxShadow={'md'}
                  {...getFieldProps('mainTechnology')}/>

                {touched.mainTechnology && Boolean(errors.mainTechnology) && <FormErrorMessage>{errors.mainTechnology}</FormErrorMessage>}
              </FormControl>

              <Stack direction={'column'} alignItems={'start'} justifyContent={'center'} w={'full'} spacing={4}>
                <FormControl>
                  <FormLabel>Project technologies list:</FormLabel>

                  <Stack direction={'row'} alignItems={'start'} justifyContent={'center'} w={'full'} spacing={4}>
                    <Input
                      onChange={(e) => setPreparedTechnology(e.target.value)}
                      value={tempTechnology}
                      isDisabled={isLoading}
                      boxShadow={'md'}
                      type={'text'}/>

                    <Button onClick={() => handleSetTechnology(UpdateTechnologyListEnum.ADD, null)} colorScheme={'telegram'} isLoading={isLoading} boxShadow={'md'}>Add</Button>
                  </Stack>
                </FormControl>

                {
                  technologiesValue.length && <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} w={'full'} spacing={4} overflowX={'auto'}>
                    {
                      technologiesValue.map((item: string, idx: number) => (
                        <Badge key={`${idx}-${item}`} p={2} colorScheme={'telegram'}>
                          <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} spacing={2}>
                            <Text>{item}</Text>

                            <IconButton
                              onClick={() => handleSetTechnology(UpdateTechnologyListEnum.REMOVE, item)}
                              variant={'ghost'}
                              colorScheme={'red'}
                              isDisabled={isLoading}
                              isRound={true}
                              icon={<Icon as={CloseIcon} w={'18px'} h={'18px'}/>}
                              minW={'20px'}
                              minH={'20px'}
                              w={'20px'}
                              h={'20px'}
                              aria-label={'Remove technology'}/>
                          </Stack>
                        </Badge>
                      ))
                    }
                  </Stack>
                }
              </Stack>

              <FormControl isRequired={true} isInvalid={Boolean(touched.file && errors.file)}>
                <FormLabel>Project preview:</FormLabel>

                {
                  projectPayload?.fileSrc &&
                  <Image src={projectPayload?.fileSrc || ''} maxW={320} objectFit={'contain'} alt={'Project preview'} mb={4}/>
                }

                <Input
                  onChange={(e) => updateFileInputValue(e.target.files)}
                  multiple={false}
                  accept={'.jpg, .jpeg, .png'}
                  isDisabled={isLoading}
                  type={'file'}
                  pl={1}
                  border={'none'}/>

                {/* TODO fix it*/}
                {/*{touched.file && Boolean(errors.file) && <FormErrorMessage>{errors.file}</FormErrorMessage>}*/}
              </FormControl>

              <FormControl>
                <FormLabel htmlFor={'project-visibility'}>Project visibility:</FormLabel>

                <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} spacing={6}>
                  <Switch
                    id={'project-visibility'}
                    isDisabled={isLoading}
                    colorScheme={'teal'}
                    isChecked={values.visibility}
                    {...getFieldProps('visibility')}/>

                  <Text>{values.visibility ? 'Visible' : 'Hidden'}</Text>
                </Stack>
              </FormControl>
            </Stack>
          </GridItem>
        </Grid>

        <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} w={'full'} spacing={4}>
          <Button type={'submit'} isLoading={isLoading} colorScheme={'teal'} mt={6} boxShadow={'md'}>
            {type === 'create' ? 'Create' : 'Save'}
          </Button>
        </Stack>
      </form>
    </BaseContentContainer>
  );
};

export default ProjectForm;
