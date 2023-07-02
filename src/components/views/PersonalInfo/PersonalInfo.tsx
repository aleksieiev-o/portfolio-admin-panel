import React, { FC, ReactElement, useState } from 'react';
import BaseContentContainer from '@/components/UI/Containers/BaseContent.container';
import { Button, Heading, Input, Stack, Text } from '@chakra-ui/react';
import EditableField from '@/components/views/PersonalInfo/EditableField';
import { StaticProps } from '@/shared/types/StaticProps.type';
import { IPersonalInfo } from 'my-portfolio-types';
import { updateFile } from '@/services/data.service';

const PersonalInfo: FC<StaticProps<IPersonalInfo>> = ({payload}): ReactElement => {
  const {firstName, lastName, birthDate, country, town, aboutMe} = payload;
  const [bioFile, setBioFile] = useState<File>();
  const [mainImageFile, setMainImageFile] = useState<File>();
  const [bioLoading, setBioLoading] = useState<boolean>(false);
  const [mainImageLoading, setMainImageLoading] = useState<boolean>(false);

  const handleUploadFile = async (path: 'bio' | 'main-image') => {
    if (path === 'bio' && bioFile) {
      setBioLoading(true);
      await updateFile(bioFile, path);
      await setBioFile(undefined);
      await setBioLoading(false);
    } else if (path === 'main-image' && mainImageFile) {
      setMainImageLoading(true);
      await updateFile(mainImageFile, path);
      await setMainImageFile(undefined);
      await setMainImageLoading(false);
    }
  };

  return (
    <BaseContentContainer>
      <Stack direction={'column'} alignItems={'center'} justifyContent={'start'} w={'full'} overflow={'hidden'} spacing={4}>
        <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} w={'full'} overflow={'hidden'} spacing={2}>
          <Heading size={'lg'} color={'orange.400'}>Main info</Heading>

          <EditableField
            title={'First name'}
            fieldKey={'firstName'}
            textInputType={'input'}
            defaultValue={firstName}
            textInputPlaceholder={'Enter your first name'}/>

          <EditableField
            title={'Last name'}
            fieldKey={'lastName'}
            textInputType={'input'}
            defaultValue={lastName}
            textInputPlaceholder={'Enter your last name'}/>

          <EditableField
            title={'Birth date'}
            fieldKey={'birthDate'}
            textInputType={'input'}
            defaultValue={birthDate?.toString()}
            textInputPlaceholder={'Enter your birth date. Format - DD.MM.YYYY'}/>

          <EditableField
            title={'Country'}
            fieldKey={'country'}
            textInputType={'input'}
            defaultValue={country}
            textInputPlaceholder={'Enter your country'}/>

          <EditableField
            title={'Town'}
            fieldKey={'town'}
            textInputType={'input'}
            defaultValue={town}
            textInputPlaceholder={'Enter your town'}/>

          <EditableField
            title={'About me'}
            fieldKey={'aboutMe'}
            textInputType={'textarea'}
            defaultValue={aboutMe}
            textInputPlaceholder={'Enter your information'}/>
        </Stack>

        <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} w={'full'} overflow={'hidden'} spacing={2}>
          <Heading size={'lg'} color={'orange.400'}>Main image</Heading>

          <Input
              onChange={(e) => setMainImageFile(e.target?.files[0])}
              multiple={false}
              accept={'.jpg, .jpeg, .png'}
              isDisabled={mainImageLoading}
              type={'file'}
              pl={1}
              border={'none'}/>

          <Button onClick={() => handleUploadFile('main-image')} colorScheme={'teal'} isLoading={mainImageLoading}>Upload image</Button>
        </Stack>

        <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} w={'full'} overflow={'hidden'} spacing={2}>
          <Heading size={'lg'} color={'orange.400'}>Main BIO</Heading>

          <Input
              onChange={(e) => setBioFile(e.target?.files[0])}
              multiple={false}
              accept={'.pdf'}
              isDisabled={bioLoading}
              type={'file'}
              pl={1}
              border={'none'}/>

          <Button onClick={() => handleUploadFile('bio')} colorScheme={'teal'} isLoading={bioLoading}>Upload BIO</Button>
        </Stack>
      </Stack>
    </BaseContentContainer>
  );
};

export default PersonalInfo;
