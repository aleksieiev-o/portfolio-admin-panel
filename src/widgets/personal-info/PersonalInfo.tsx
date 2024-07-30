'use client';

import {RouteName, RoutePath} from '@/shared/router/Routes.enum';
import PageTitle from '@/shared/widgets/PageTitle';
import {FC, ReactElement, useContext} from 'react';
import PersonalInfoItem from './_widgets/PersonalInfoItem';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';
import {useQuery} from '@tanstack/react-query';
import EmptyListNotification from '@/shared/widgets/EmptyListNotification';
import {fetchPersonalInfo} from '@/entities/personalInfo/personalInfo.service';
import PersonalInfoImage from './_widgets/PersonalInfoImage';

const PersonalInfo: FC = (): ReactElement => {
  const {user} = useContext(AppAuthContext);

  const {
    data: personalInfoQueryData,
    isPending: personalInfoIsPending,
    isSuccess: personalInfoIsSuccess,
  } = useQuery({
    queryKey: [RoutePath.PERSONAL_INFO],
    queryFn: async () => await fetchPersonalInfo(),
    staleTime: 5 * 1000,
    enabled: !!user,
  });

  return (
    <div className="flex h-full w-full flex-col gap-6 overflow-hidden py-6">
      <PageTitle title={RouteName.PERSONAL_INFO} />

      <div className="grid w-full grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2 md:gap-6">
        <div className="gap4 flex flex-col items-start justify-start md:gap-6">
          {personalInfoIsSuccess ? (
            <>
              <PersonalInfoItem
                inputVariant="text"
                mode={'input'}
                type={'text'}
                fieldName={'firstName'}
                label={'First name'}
                placeholder={'Enter your first name'}
                isDataPending={personalInfoIsPending}
                itemValue={personalInfoQueryData['firstName']}
              />

              <PersonalInfoItem
                inputVariant="text"
                mode={'input'}
                type={'text'}
                fieldName={'lastName'}
                label={'Last name'}
                placeholder={'Enter your last name'}
                isDataPending={personalInfoIsPending}
                itemValue={personalInfoQueryData['lastName']}
              />

              <PersonalInfoItem
                inputVariant="text"
                mode={'input'}
                type={'email'}
                fieldName={'email'}
                label={'Email'}
                placeholder={'Enter your email'}
                isDataPending={personalInfoIsPending}
                itemValue={personalInfoQueryData['email']}
              />

              <PersonalInfoItem
                inputVariant="date"
                mode={'input'}
                type={'text'}
                fieldName={'birthDate'}
                label={'Birth date'}
                placeholder={'Enter your birth date'}
                isDataPending={personalInfoIsPending}
                itemValue={personalInfoQueryData['birthDate']}
              />

              <PersonalInfoItem
                inputVariant="text"
                mode={'input'}
                type={'text'}
                fieldName={'country'}
                label={'Country'}
                placeholder={'Enter your country'}
                isDataPending={personalInfoIsPending}
                itemValue={personalInfoQueryData['country']}
              />

              <PersonalInfoItem
                inputVariant="text"
                mode={'input'}
                type={'text'}
                fieldName={'town'}
                label={'Town'}
                placeholder={'Enter your town'}
                isDataPending={personalInfoIsPending}
                itemValue={personalInfoQueryData['town']}
              />

              <PersonalInfoItem
                inputVariant="text"
                mode={'input'}
                type={'text'}
                fieldName={'mapPoint'}
                label={'Map point'}
                placeholder={'Enter your map point'}
                isDataPending={personalInfoIsPending}
                itemValue={personalInfoQueryData['mapPoint']}
              />

              <PersonalInfoItem
                inputVariant="text"
                mode={'textarea'}
                type={'text'}
                fieldName={'aboutMe'}
                label={'About me'}
                placeholder={'Enter the information about you'}
                isDataPending={personalInfoIsPending}
                itemValue={personalInfoQueryData['aboutMe']}
              />

              <PersonalInfoItem
                inputVariant="text"
                mode={'textarea'}
                type={'text'}
                fieldName={'biography'}
                label={'Biography'}
                placeholder={'Enter your biography'}
                isDataPending={personalInfoIsPending}
                itemValue={personalInfoQueryData['biography']}
              />
            </>
          ) : (
            <EmptyListNotification notification="Loading..." />
          )}
        </div>

        <PersonalInfoImage />
      </div>
    </div>
  );
};

export default PersonalInfo;
