'use client';

import {fetchAllSkills, removeAllSkills} from '@/entities/skills/skills.service';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';
import {RoutePath, RouteName} from '@/shared/router/Routes.enum';
import PageContentCard from '@/shared/widgets/pageContent/_widgets/PageContentCard';
import PageContentHeader from '@/shared/widgets/pageContent/PageContentHeader';
import PageContentList from '@/shared/widgets/pageContent/PageContentList';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {FC, ReactElement, useContext, useMemo, useState} from 'react';
import SkillsContent from './_widgets/SKillsContent';
import RemoveSkillConfirmDialog from './_widgets/RemoveSkillConfirm.dialog';
import {ISkill} from 'my-portfolio-types';

const Skills: FC = (): ReactElement => {
  const {user} = useContext(AppAuthContext);
  const queryClient = useQueryClient();
  const [dialogRemoveIsOpen, setDialogRemoveIsOpen] = useState<boolean>(false);
  const [skillToRemove, setSkillToRemove] = useState<ISkill>({} as ISkill);

  const {
    data: skillsQueryData,
    isPending: skillsIsPending,
    isSuccess: skillsIsSuccess,
  } = useQuery({
    queryKey: [RoutePath.SKILLS],
    queryFn: async () => await fetchAllSkills(),
    staleTime: 5 * 1000,
    enabled: !!user,
  });

  const handlePrepareToRemove = async (id: string) => {
    const skillsQueryData = await queryClient.ensureQueryData({queryKey: [RoutePath.SKILLS], queryFn: async () => await fetchAllSkills()});
    const skill = skillsQueryData.find((skill) => skill.id === id)!;

    setSkillToRemove(skill);
    setDialogRemoveIsOpen(true);
  };

  const isEmptyList = useMemo(() => Boolean(skillsQueryData && skillsQueryData.length === 0), [skillsQueryData]);

  return (
    <div className="flex h-full w-full flex-col gap-6 py-6">
      <PageContentHeader
        pageTitle={RouteName.SKILLS}
        createTitle="Create new skill"
        removeTitle="Remove all skills"
        createLink={RoutePath.CREATE_SKILL}
        dialogTitle={'Remove all skills confirmation'}
        dialogDescription={'You are about to remove all skills.'}
        dialogQuestion={'Are you sure you want to remove all skills?'}
        btnTitle={'Remove all skills'}
        toastDescription="All skills have successfully removed."
        handleRemoveAll={removeAllSkills}
        queryKey={RoutePath.SKILLS}
        isEmptyList={isEmptyList}
        pending={skillsIsPending}
      />

      <div className="grid w-full grid-cols-1 gap-4 overflow-hidden md:gap-6">
        <PageContentList pending={skillsIsPending} isEmptyList={isEmptyList} emptyListNotification="Skills list is empty">
          {skillsQueryData && skillsQueryData.length > 0 && (
            <>
              {skillsQueryData.map((skill) => (
                <PageContentCard
                  key={skill.id}
                  id={skill.id}
                  title={skill.title}
                  position={skill.position}
                  visibility={skill.visibility}
                  createdDate={skill.createdDate}
                  updatedDate={skill.updatedDate}
                  pageDirection={RoutePath.SKILLS}
                  updateButtonTitle="Update skill"
                  removeButtonTitle="Remove skill"
                  handleRemove={async () => await handlePrepareToRemove(skill.id)}
                >
                  <SkillsContent skill={skill} />
                </PageContentCard>
              ))}
            </>
          )}
        </PageContentList>
      </div>

      <RemoveSkillConfirmDialog setDialogIsOpen={setDialogRemoveIsOpen} dialogIsOpen={dialogRemoveIsOpen} skill={skillToRemove} />
    </div>
  );
};

export default Skills;
