import React, { FC, ReactElement } from 'react';
import BaseContentContainer from '@/components/UI/BaseContentContainer';
import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import EditableField from '@/components/views/Projects/EditableField';
import { StaticProps } from '@/shared/types/StaticProps.type';
import { IPersonalInfo } from 'my-portfolio-types';

const PersonalInfo: FC<StaticProps<IPersonalInfo>> = ({payload}): ReactElement => {
  const {firstName, lastName, birthDate, country, town, aboutMe} = payload;

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

          <Button colorScheme={'teal'}>Upload image</Button>
        </Stack>

        <Stack direction={'column'} alignItems={'start'} justifyContent={'start'} w={'full'} overflow={'hidden'} spacing={2}>
          <Heading size={'lg'} color={'orange.400'}>Main BIO</Heading>

          <Button colorScheme={'teal'}>Upload BIO</Button>
        </Stack>
      </Stack>
    </BaseContentContainer>
  );
};

export default PersonalInfo;
