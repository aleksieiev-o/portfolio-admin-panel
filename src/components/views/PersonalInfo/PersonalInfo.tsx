import React, { FC, ReactElement, useState } from 'react';
import BaseContentContainer from '@/components/UI/Containers/BaseContent.container';
import { Button, Heading, Image, Input, Stack, Text } from '@chakra-ui/react';
import PersonalInfoForm from '@/components/views/PersonalInfo/PersonalInfoForm';
import { StaticProps } from '@/shared/types/StaticProps.type';
import { updatePersonalInfoFile } from '@/services/files.service';
import { IAllPersonalInfo } from '@/shared/types/AllPersonalInfo.interface';
import { useLoading } from '@/hooks/useLoading';
import {ProtectedRoutePath} from '@/router/Routes.enum';
import {useRouter} from 'next/router';

const PersonalInfo: FC<StaticProps<IAllPersonalInfo>> = ({payload}): ReactElement => {
  const router = useRouter();
  const {personalInfo, mainImage} = payload;
  const {firstName, lastName, email, birthDate, country, town, mapPoint, aboutMe, biography} = personalInfo;
  const [mainImageFile, setMainImageFile] = useState<File>();
  const {isLoading, setIsLoading} = useLoading();

  const handleUploadFile = async () => {
    if (mainImageFile) {
      setIsLoading(true);
      await updatePersonalInfoFile(mainImage, mainImageFile);
      await setMainImageFile(undefined);
      await setIsLoading(false);
    }

    await router.push(ProtectedRoutePath.PERSONAL_INFO);
  };

  return (
    <BaseContentContainer>
      <Stack direction={'column'} alignItems={'center'} justifyContent={'start'} w={'full'} overflow={'hidden'} spacing={4}>
        <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} w={'full'} overflow={'hidden'} spacing={2}>
          <Heading size={'lg'} color={'orange.400'}>Personal info</Heading>

          <PersonalInfoForm
            title={'First name'}
            fieldKey={'firstName'}
            textInputMode={'input'}
            defaultValue={firstName}
            textInputPlaceholder={'Enter your first name'}/>

          <PersonalInfoForm
            title={'Last name'}
            fieldKey={'lastName'}
            textInputMode={'input'}
            defaultValue={lastName}
            textInputPlaceholder={'Enter your last name'}/>

          <PersonalInfoForm
            title={'Email'}
            fieldKey={'email'}
            textInputMode={'input'}
            defaultValue={email}
            textInputPlaceholder={'Enter your email'}/>

          <PersonalInfoForm
            title={'Birth date'}
            fieldKey={'birthDate'}
            textInputMode={'input'}
            inputType={'date'}
            defaultValue={birthDate}
            textInputPlaceholder={'Enter your birth date'}/>

          <PersonalInfoForm
            title={'Country'}
            fieldKey={'country'}
            textInputMode={'input'}
            defaultValue={country}
            textInputPlaceholder={'Enter your country'}/>

          <PersonalInfoForm
            title={'Town'}
            fieldKey={'town'}
            textInputMode={'input'}
            defaultValue={town}
            textInputPlaceholder={'Enter your town'}/>

          <PersonalInfoForm
            title={'Map point'}
            fieldKey={'mapPoint'}
            textInputMode={'input'}
            defaultValue={mapPoint}
            textInputPlaceholder={'Enter your map point'}/>

          <PersonalInfoForm
            title={'About me'}
            fieldKey={'aboutMe'}
            textInputMode={'textarea'}
            defaultValue={aboutMe}
            textInputPlaceholder={'Enter your information'}/>

          <PersonalInfoForm
            title={'My biography'}
            fieldKey={'biography'}
            textInputMode={'textarea'}
            defaultValue={biography}
            textInputPlaceholder={'Enter your biography'}/>
        </Stack>

        <Stack direction={'row'} alignItems={'start'} justifyContent={'center'} w={'full'} overflow={'hidden'} spacing={2}>
          <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} flex={1} overflow={'hidden'} spacing={2}>
            <Heading size={'lg'} color={'orange.400'}>Main image</Heading>

            <Input
              onChange={(e: any) => setMainImageFile(e.target?.files[0])}
              multiple={false}
              accept={'.jpg, .jpeg, .png'}
              isDisabled={isLoading}
              type={'file'}
              pl={1}
              border={'none'}/>

            <Button onClick={() => handleUploadFile()} colorScheme={'teal'} isLoading={isLoading}>Upload image</Button>
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
      </Stack>
    </BaseContentContainer>
  );
};

export default PersonalInfo;
