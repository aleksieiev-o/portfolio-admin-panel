import React, { FC, ReactElement } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Stack,
  Switch,
  Text
} from '@chakra-ui/react';
import BaseContentContainer from '@/components/UI/Containers/BaseContent.container';
import { useRouter } from 'next/router';
import { createSocial } from '@/services/socialsList.service';
import { ProtectedRoutePath } from '@/router/Routes.enum';
import { useLoading } from '@/hooks/useLoading';
import {object, string} from 'yup';
import {STRINGS} from '@/locales';
import {FormikHelpers, useFormik} from 'formik';
import {updateById} from '@/services/data.service';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {TypeCreateSocialDto} from '@/shared/dto/createSocial.dto';
import {StaticProps} from '@/shared/types/StaticProps.type';
import {ISocial} from 'my-portfolio-types';

interface Props extends StaticProps<ISocial | null> {
  type: 'create' | 'update';
}

const SocialCardForm: FC<Props> = (props): ReactElement => {
  const {type, payload: socialPayload} = props;
  const router = useRouter();
  const {isLoading, setIsLoading} = useLoading();

  const initialValues: TypeCreateSocialDto = {
    position: socialPayload?.position || '',
    title: socialPayload?.title || '',
    visibility: socialPayload ? socialPayload.visibility : true,
    url: socialPayload?.url || '',
  };

  const validationSchema = object().shape({
    position: string().trim().required(STRINGS.requiredField),
    title: string().trim().required(STRINGS.requiredField),
    url: string().trim().required(STRINGS.requiredField),
  });

  const handleFormSubmit = async (payload: TypeCreateSocialDto, formikHelpers: FormikHelpers<TypeCreateSocialDto>) => {
    setIsLoading(true);

    try {
      if (type === 'create') {
        await createSocial(payload);
      } else if (type === 'update') {
        await updateById<TypeCreateSocialDto>(payload, EndpointsList.SOCIALS, router.query.id as string);
      }

      formikHelpers.resetForm();

      await router.push(ProtectedRoutePath.SOCIALS);
    } catch (err) {
      console.warn(err);
    } finally {
      formikHelpers.setSubmitting(false);
      setIsLoading(false);
    }
  };

  const formik = useFormik<TypeCreateSocialDto>({
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
                <FormLabel>Social title:</FormLabel>

                <Input
                  isDisabled={isLoading}
                  boxShadow={'md'}
                  type={'text'}
                  {...getFieldProps('title')}/>

                {touched.title && Boolean(errors.title) && <FormErrorMessage>{errors.title}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired={true} isInvalid={Boolean(touched.url && errors.url)}>
                <FormLabel>Social URL:</FormLabel>

                <Input
                  isDisabled={isLoading}
                  boxShadow={'md'}
                  type={'text'}
                  {...getFieldProps('url')}/>

                {touched.url && Boolean(errors.url) && <FormErrorMessage>{errors.url}</FormErrorMessage>}
              </FormControl>
            </Stack>
          </GridItem>

          <GridItem>
            <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} w={'full'} spacing={4}>
              <FormControl isRequired={true} isInvalid={Boolean(touched.position && errors.position)}>
                <FormLabel>Social position in list:</FormLabel>

                <Input
                  type={'number'}
                  boxShadow={'md'}
                  isDisabled={isLoading}
                  {...getFieldProps('position')}/>

                {touched.position && Boolean(errors.position) && <FormErrorMessage>{errors.position}</FormErrorMessage>}
              </FormControl>

              <FormControl>
                <FormLabel htmlFor={'social-visibility'}>Social card visibility:</FormLabel>

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

export default SocialCardForm;
