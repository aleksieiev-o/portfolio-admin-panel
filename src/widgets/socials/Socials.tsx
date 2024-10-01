'use client';

import {fetchAllSocials, removeAllSocials} from '@/entities/socials/socials.service';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';
import {RouteName, RoutePath} from '@/shared/router/Routes.enum';
import PageContentCard from '@/shared/widgets/pageContent/_widgets/PageContentCard';
import PageContentHeader from '@/shared/widgets/pageContent/PageContentHeader';
import PageContentList from '@/shared/widgets/pageContent/PageContentList';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {FC, ReactElement, useContext, useMemo, useState} from 'react';
import SocialsContent from './_widgets/SocialsContent';
import {ISocial} from 'my-portfolio-types';
import RemoveSocialConfirmDialog from './_widgets/RemoveSocialConfirm.dialog';

const Socials: FC = (): ReactElement => {
  const {user} = useContext(AppAuthContext);
  const queryClient = useQueryClient();
  const [dialogRemoveIsOpen, setDialogRemoveIsOpen] = useState<boolean>(false);
  const [socialToRemove, setSocialToRemove] = useState<ISocial>({} as ISocial);

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

  const handlePrepareToRemove = async (id: string) => {
    const socialsQueryData = await queryClient.ensureQueryData({queryKey: [RoutePath.SOCIALS], queryFn: async () => await fetchAllSocials()});
    const social = socialsQueryData.find((social) => social.id === id)!;

    setSocialToRemove(social);
    setDialogRemoveIsOpen(true);
  };

  const isEmptyList = useMemo(() => Boolean(socialsQueryData && socialsQueryData.length === 0), [socialsQueryData]);

  return (
    <div className="flex h-full w-full flex-col gap-6 py-6">
      <PageContentHeader
        pageTitle={RouteName.SOCIALS}
        createTitle="Create new social"
        removeTitle="Remove all socials"
        createLink={RoutePath.CREATE_SOCIAL}
        dialogTitle={'Remove all socials confirmation'}
        dialogDescription={'You are about to remove all socials.'}
        dialogQuestion={'Are you sure you want to remove all socials?'}
        btnTitle={'Remove all socials'}
        toastDescription="All socials have successfully removed."
        handleRemoveAll={removeAllSocials}
        queryKey={RoutePath.SOCIALS}
        isEmptyList={isEmptyList}
        pending={socialsIsPending}
      />

      <div className="grid w-full grid-cols-1 gap-4 overflow-hidden md:gap-6">
        <PageContentList pending={socialsIsPending} isEmptyList={isEmptyList} emptyListNotification="Socials list is empty">
          {socialsQueryData && socialsQueryData.length > 0 && (
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
                  pageDirection={RoutePath.SOCIALS}
                  updateButtonTitle="Update social"
                  removeButtonTitle="Remove social"
                  handleRemove={async () => await handlePrepareToRemove(social.id)}
                >
                  <SocialsContent url={social.url} iconName={social.iconName} />
                </PageContentCard>
              ))}
            </>
          )}
        </PageContentList>
      </div>

      <RemoveSocialConfirmDialog setDialogIsOpen={setDialogRemoveIsOpen} dialogIsOpen={dialogRemoveIsOpen} social={socialToRemove} />
    </div>
  );
};

export default Socials;
