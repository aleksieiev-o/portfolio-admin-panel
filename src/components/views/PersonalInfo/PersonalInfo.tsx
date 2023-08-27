import React, { FC, ReactElement, useState } from 'react';
import BaseContentContainer from '@/components/UI/Containers/BaseContent.container';
import { Button, Heading, Image, Input, Stack, Text } from '@chakra-ui/react';
import EditableField from '@/components/views/PersonalInfo/EditableField';
import { StaticProps } from '@/shared/types/StaticProps.type';
import { updatePersonalInfoFile } from '@/services/files.service';
import { IAllPersonalInfo } from '@/shared/types/AllPersonalInfo.interface';
import { useLoading } from '@/hooks/useLoading';
import {ProtectedRoutePath} from '@/router/Routes.enum';
import {useRouter} from 'next/router';

const PersonalInfo: FC<StaticProps<IAllPersonalInfo>> = ({payload}): ReactElement => {
  const router = useRouter();
  const {personalInfo, mainImage, bio} = payload;
  const {firstName, lastName, birthDate, country, town, aboutMe} = personalInfo;
  const [bioFile, setBioFile] = useState<File>();
  const [mainImageFile, setMainImageFile] = useState<File>();
  const {isLoading: bioLoading, setIsLoading: setBioLoading} = useLoading();
  const {isLoading: mainImageLoading, setIsLoading: setMainImageLoading} = useLoading();

  const handleUploadFile = async (path: ProtectedRoutePath.BIO | ProtectedRoutePath.MAIN_IMAGE) => {
    if (path === ProtectedRoutePath.BIO && bioFile) {
      setBioLoading(true);
      await updatePersonalInfoFile(bio, bioFile, ProtectedRoutePath.BIO);
      await setBioFile(undefined);
      await setBioLoading(false);
    } else if (path === ProtectedRoutePath.MAIN_IMAGE && mainImageFile) {
      setMainImageLoading(true);
      await updatePersonalInfoFile(mainImage, mainImageFile, ProtectedRoutePath.MAIN_IMAGE);
      await setMainImageFile(undefined);
      await setMainImageLoading(false);
    }

    await router.push(ProtectedRoutePath.PERSONAL_INFO);
  };

  return (
    <BaseContentContainer>
      <Stack direction={'column'} alignItems={'center'} justifyContent={'start'} w={'full'} overflow={'hidden'} spacing={4}>
        <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} w={'full'} overflow={'hidden'} spacing={2}>
          <Heading size={'lg'} color={'orange.400'}>Personal info</Heading>

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

        <Stack direction={'row'} alignItems={'start'} justifyContent={'center'} w={'full'} overflow={'hidden'} spacing={2}>
          <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} flex={1} overflow={'hidden'} spacing={2}>
            <Heading size={'lg'} color={'orange.400'}>Main image</Heading>

            <Input
              onChange={(e: any) => setMainImageFile(e.target?.files[0])}
              multiple={false}
              accept={'.jpg, .jpeg, .png'}
              isDisabled={mainImageLoading}
              type={'file'}
              pl={1}
              border={'none'}/>

            <Button onClick={() => handleUploadFile(ProtectedRoutePath.MAIN_IMAGE)} colorScheme={'teal'} isLoading={mainImageLoading}>Upload image</Button>
          </Stack>

          <Stack alignItems={'center'} justifyContent={'center'} flex={1}>
            {
              mainImage.fileName ?
                <Image
                  src={mainImage.fileSrc}
                  alt={mainImage.fileName}
                  objectFit={'contain'}
                  maxW={320}/>
                :
                <Text>File main image is not enabled</Text>
            }
          </Stack>
        </Stack>

        <Stack direction={'row'} alignItems={'start'} justifyContent={'center'} w={'full'} overflow={'hidden'} spacing={2}>
          <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} flex={1} overflow={'hidden'} spacing={2}>
            <Heading size={'lg'} color={'orange.400'}>BIO</Heading>

            <Input
              onChange={(e: any) => setBioFile(e.target?.files[0])}
              multiple={false}
              accept={'.pdf'}
              isDisabled={bioLoading}
              type={'file'}
              pl={1}
              border={'none'}/>

            <Button onClick={() => handleUploadFile(ProtectedRoutePath.BIO)} colorScheme={'teal'} isLoading={bioLoading}>Upload BIO</Button>
          </Stack>

          <Stack alignItems={'center'} justifyContent={'center'} flex={1}>
            {
              bio.fileName ?
                <Image
                  src={bio.fileSrc}
                  alt={bio.fileName}
                  objectFit={'contain'}
                  maxW={320}/>
                :
                <Text>File BIO is not enabled</Text>
            }
          </Stack>
        </Stack>
      </Stack>
    </BaseContentContainer>
  );
};

export default PersonalInfo;
