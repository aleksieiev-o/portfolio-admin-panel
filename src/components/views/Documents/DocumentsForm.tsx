import React, {FC, ReactElement, useMemo} from 'react';
import {StaticProps} from '@/shared/types/StaticProps.type';
import {IDocument} from 'my-portfolio-types';
import {useRouter} from 'next/router';
import {useLoading} from '@/hooks/useLoading';
import {mixed, object, string} from 'yup';
import {STRINGS} from '@/locales';
import {FormikHelpers, useFormik} from 'formik';
import {ProtectedRoutePath} from '@/router/Routes.enum';
import {createDocument, updateDocumentById} from '@/services/documents.service';
import {TypeCreateDocumentDto} from '@/shared/dto/createDocument.dto';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input, Select,
  Stack, Switch, Text,
} from '@chakra-ui/react';
import BaseContentContainer from '@/components/UI/Containers/BaseContent.container';
import {AppLocaleEnum, AppLocaleNameEnum} from '@/shared/types/AppLocale.enum';

interface Props extends StaticProps<IDocument | null> {
  type: 'create' | 'update';
}

const DocumentsForm: FC<Props> = (props): ReactElement => {
  const {type, payload: documentPayload} = props;
  const router = useRouter();
  const {isLoading, setIsLoading} = useLoading();

  const initialValues: TypeCreateDocumentDto = {
    position: documentPayload?.position || '',
    title: documentPayload?.title || '',
    lang: documentPayload?.lang || '',
    visibility: documentPayload ? documentPayload.visibility : true,
  };

  const validationSchema = useMemo(() => {
    if (type === 'create') {
      return object().shape({
        position: string().trim().required(STRINGS.requiredField),
        title: string().trim().required(STRINGS.requiredField),
        lang: mixed().required(STRINGS.requiredField).oneOf([AppLocaleEnum.EN_US, AppLocaleEnum.DE_DE, AppLocaleEnum.RU_RU]),
      });
    }

    return object().shape({
      position: string().trim().required(STRINGS.requiredField),
      title: string().trim().required(STRINGS.requiredField),
      lang: mixed().required(STRINGS.requiredField).oneOf([AppLocaleEnum.EN_US, AppLocaleEnum.DE_DE, AppLocaleEnum.RU_RU]),
    });
  }, [type]);

  const handleFormSubmit = async (payload: TypeCreateDocumentDto, formikHelpers: FormikHelpers<TypeCreateDocumentDto>) => {
    setIsLoading(true);

    try {
      if (type === 'create') {
        await createDocument(payload);
      } else if (type === 'update') {
        await updateDocumentById(payload, router.query.id as string);
      }

      formikHelpers.resetForm();

      await router.push(ProtectedRoutePath.DOCUMENTS);
    } catch (err) {
      console.warn(err);
    } finally {
      formikHelpers.setSubmitting(false);
      setIsLoading(false);
    }
  };

  const formik = useFormik<TypeCreateDocumentDto>({
    initialValues,
    validationSchema,
    onSubmit: handleFormSubmit,
    validateOnBlur: true,
  });

  const { handleSubmit, values, touched, errors, getFieldProps } = formik;

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
                <FormLabel>Document title:</FormLabel>

                <Input
                  isDisabled={isLoading}
                  type={'text'}
                  boxShadow={'md'}
                  {...getFieldProps('title')}/>

                {touched.title && Boolean(errors.title) && <FormErrorMessage>{errors.title}</FormErrorMessage>}
              </FormControl>

              <FormControl isRequired={true} isInvalid={Boolean(touched.lang && errors.lang)}>
                <FormLabel>Document language:</FormLabel>

                <Select
                  isDisabled={isLoading}
                  boxShadow={'md'}
                  placeholder={'Select language'}
                  {...getFieldProps('lang')}>
                  <option value={AppLocaleEnum.EN_US}>{AppLocaleNameEnum.EN_US}</option>
                  <option value={AppLocaleEnum.DE_DE}>{AppLocaleNameEnum.DE_DE}</option>
                  <option value={AppLocaleEnum.RU_RU}>{AppLocaleNameEnum.RU_RU}</option>
                </Select>

                {touched.lang && Boolean(errors.lang) && <FormErrorMessage>{errors.lang}</FormErrorMessage>}
              </FormControl>
            </Stack>
          </GridItem>

          <GridItem overflow={'hidden'}>
            <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} w={'full'} spacing={4}>
              <FormControl isRequired={true} isInvalid={Boolean(touched.position && errors.position)}>
                <FormLabel>Document position in a list:</FormLabel>

                <Input
                  isDisabled={isLoading}
                  type={'number'}
                  boxShadow={'md'}
                  {...getFieldProps('position')}/>

                {touched.position && Boolean(errors.position) && <FormErrorMessage>{errors.position}</FormErrorMessage>}
              </FormControl>

              <FormControl>
                <FormLabel htmlFor={'document-visibility'}>Document visibility:</FormLabel>

                <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-start'} spacing={6}>
                  <Switch
                    id={'document-visibility'}
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

export default DocumentsForm;
