'use client';

import {fetchAllSocials} from '@/entities/socials/socials.service';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';
import {RouteName, RoutePath} from '@/shared/router/Routes.enum';
import EmptyListNotification from '@/shared/widgets/EmptyListNotification';
import PageContentCard from '@/shared/widgets/pageContent/_widgets/PageContentCard';
import PageContentHeader from '@/shared/widgets/pageContent/PageContentHeader';
import PageContentList from '@/shared/widgets/pageContent/PageContentList';
import {useQuery} from '@tanstack/react-query';
import {FC, ReactElement, useContext} from 'react';
import SocialsContent from './_widgets/SocialsContent';

const Socials: FC = (): ReactElement => {
  const {user} = useContext(AppAuthContext);

  const {
    data: socialsQueryData,
    isPending: socialsIsPending,
    isSuccess: socialsIsSuccess,
  } = useQuery({
    queryKey: [RoutePath.SOCIALS],
    queryFn: async () => await fetchAllSocials(),
    staleTime: 5 * 1000,
    enabled: !!user,
  });

  return (
    <div className="flex h-full w-full flex-col gap-6 py-6">
      <PageContentHeader pageTitle={RouteName.SOCIALS} createTitle="Create new social" removeTitle="Remove all socials" />

      <div className="flex h-full w-full flex-row items-start justify-between gap-4 overflow-hidden md:gap-6">
        <PageContentList pending={socialsIsPending}>
          {socialsIsSuccess ? (
            <>
              {socialsQueryData.map((social) => (
                <PageContentCard
                  key={social.id}
                  id={social.id}
                  title={social.title}
                  position={social.position}
                  visibility={social.visibility}
                  createdDate={social.createdDate}
                  updatedDate={social.updatedDate}
                >
                  <SocialsContent test="TEST" />
                </PageContentCard>
              ))}
            </>
          ) : (
            <EmptyListNotification notification="Socials list is empty" />
          )}
        </PageContentList>
      </div>
    </div>
  );
};

export default Socials;
