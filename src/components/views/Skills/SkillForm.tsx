import React, { FC, ReactElement } from 'react';
import BaseContentContainer from '@/components/UI/Containers/BaseContent.container';
import {
  Button,
  FormControl,
  Input,
  Stack,
  Switch,
  FormLabel,
  Grid,
  GridItem,
  Text,
  FormErrorMessage
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { createSkill } from '@/services/skills.service';
import { ProtectedRoutePath } from '@/router/Routes.enum';
import { useLoading } from '@/hooks/useLoading';
import {StaticProps} from '@/shared/types/StaticProps.type';
import {ISkill} from 'my-portfolio-types';
import {object, string} from 'yup';
import {TypeCreateSkillDto} from '@/shared/dto/createSkill.dto';
import {STRINGS} from '@/locales';
import {FormikHelpers, useFormik} from 'formik';
import {updateById} from '@/services/data.service';
import {EndpointsList} from '@/shared/Endpoints.enum';

interface Props extends StaticProps<ISkill | null> {
  type: 'create' | 'update';
}

const SkillForm: FC<Props> = (props): ReactElement => {
  const {type, payload: skillPayload} = props;
  const router = useRouter();
  const {isLoading, setIsLoading} = useLoading();

  const initialValues: TypeCreateSkillDto = {
    color: skillPayload?.color || '#777777',
    experience: skillPayload?.experience || '',
    position: skillPayload?.position || '',
    title: skillPayload?.title || '',
    visibility: skillPayload ? skillPayload.visibility : true,
  };

  const validationSchema = object().shape({
    experience: string().trim().required(STRINGS.requiredField),
    position: string().trim().required(STRINGS.requiredField),
    title: string().trim().required(STRINGS.requiredField),
  });

  const handleFormSubmit = async (payload: TypeCreateSkillDto, formikHelpers: FormikHelpers<TypeCreateSkillDto>) => {
    setIsLoading(true);

    try {
      if (type === 'create') {
        await createSkill(payload);
      } else if (type === 'update') {
        await updateById<TypeCreateSkillDto>(payload, EndpointsList.SKILLS, router.query.id as string);
      }

      formikHelpers.resetForm();

      await router.push(ProtectedRoutePath.SKILLS);
    } catch (err) {
      console.warn(err);
    } finally {
      formikHelpers.setSubmitting(false);
      setIsLoading(false);
    }
  };

  const formik = useFormik<TypeCreateSkillDto>({
    initialValues,
    validationSchema,
    onSubmit: handleFormSubmit,
    validateOnBlur: true,
  });

  const { handleSubmit, values, touched, errors, getFieldProps } = formik;

  const goBack = async () => {
    await router.back();
  };

  return (
    <BaseContentContainer>
      <form noValidate={true} onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} w={'full'} spacing={4} mb={6}>
          <Button onClick={() => goBack()} boxShadow={'md'}>Back</Button>
        </Stack>

        <Grid templateColumns={{ md: 'repeat(2, 1fr)' }} gap={6} w={'full'}>
          <GridItem>
            <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} w={'full'} spacing={4}>
              <FormControl isRequired={true} isInvalid={Boolean(touched.title && errors.title)}>
                <FormLabel>Skill title:</FormLabel>

                <Input
                  isDisabled={isLoading}
                  boxShadow={'md'}
                  type={'text'}
                  {...getFieldProps('title')}/>

                {touched.title && Boolean(errors.title) && <FormErrorMessage>{errors.title}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired={true} isInvalid={Boolean(touched.experience && errors.experience)}>
                <FormLabel>Skill experience:</FormLabel>

                <Input
                  isDisabled={isLoading}
                  boxShadow={'md'}
                  type={'number'}
                  {...getFieldProps('experience')}/>

                {touched.experience && Boolean(errors.experience) && <FormErrorMessage>{errors.experience}</FormErrorMessage>}
              </FormControl>

              <FormControl>
                <FormLabel>Skill color:</FormLabel>

                <Input
                  type={'color'}
                  boxShadow={'md'}
                  isDisabled={isLoading}
                  {...getFieldProps('color')}/>
              </FormControl>
            </Stack>
          </GridItem>

          <GridItem>
            <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} w={'full'} spacing={4}>
              <FormControl isRequired={true} isInvalid={Boolean(touched.position && errors.position)}>
                <FormLabel>Skill position in list:</FormLabel>

                <Input
                  type={'number'}
                  boxShadow={'md'}
                  isDisabled={isLoading}
                  {...getFieldProps('position')}/>

                {touched.position && Boolean(errors.position) && <FormErrorMessage>{errors.position}</FormErrorMessage>}
              </FormControl>

              <FormControl>
                <FormLabel htmlFor={'skill-visibility'}>Skill visibility:</FormLabel>

                <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} spacing={6}>
                  <Switch
                    id={'skill-visibility'}
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

export default SkillForm;
