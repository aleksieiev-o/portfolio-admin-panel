'use client';

import {RouteName, RoutePath} from '@/shared/router/Routes.enum';
import PageTitle from '@/shared/widgets/PageTitle';
import {FC, ReactElement, useContext} from 'react';
import PersonalInfoItem from './_widgets/PersonalInfoItem';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';
import {useQuery} from '@tanstack/react-query';
import EmptyListNotification from '@/shared/widgets/EmptyListNotification';
import {fetchPersonalInfo} from '@/entities/personalInfo/personalInfo.service';

const PersonalInfo: FC = (): ReactElement => {
  const {user} = useContext(AppAuthContext);

  const {
    data: personalInfoQueryData,
    isPending: personalInfoIsPending,
    isSuccess: personalInfosIsSuccess,
  } = useQuery({
    queryKey: [RoutePath.PERSONAL_INFO],
    queryFn: async () => await fetchPersonalInfo(),
    staleTime: 5 * 1000,
    enabled: !!user,
  });

  return (
    <div className="flex h-full w-full flex-col gap-6 py-6">
      <PageTitle title={RouteName.PERSONAL_INFO} />

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <div className="gap4 flex flex-col items-start justify-start md:gap-6">
          {personalInfosIsSuccess ? (
            <>
              <PersonalInfoItem
                mode={'input'}
                type={'text'}
                name={'firstName'}
                label={'First name'}
                placeholder={'Enter your first name'}
                isDataPending={personalInfoIsPending}
                itemValue={personalInfoQueryData['firstName']}
              />

              <PersonalInfoItem
                mode={'input'}
                type={'text'}
                name={'lastName'}
                label={'Last name'}
                placeholder={'Enter your last name'}
                isDataPending={personalInfoIsPending}
                itemValue={personalInfoQueryData['lastName']}
              />
            </>
          ) : (
            <EmptyListNotification notification="Loading..." />
          )}
        </div>

        <div>Main Image Component</div>
      </div>
    </div>
  );
};

export default PersonalInfo;
