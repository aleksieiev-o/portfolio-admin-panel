'use client';

import {fetchAllSkills} from '@/entities/skills/skills.service';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';
import {RoutePath, RouteName} from '@/shared/router/Routes.enum';
import EmptyListNotification from '@/shared/widgets/EmptyListNotification';
import PageContentCard from '@/shared/widgets/pageContent/_widgets/PageContentCard';
import PageContentHeader from '@/shared/widgets/pageContent/PageContentHeader';
import PageContentList from '@/shared/widgets/pageContent/PageContentList';
import {useQuery} from '@tanstack/react-query';
import {FC, ReactElement, useContext} from 'react';
import SkillsContent from './_widgets/SKillsContent';

const Skills: FC = (): ReactElement => {
  const {user} = useContext(AppAuthContext);

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

  return (
    <div className="flex h-full w-full flex-col gap-6 py-6">
      <PageContentHeader pageTitle={RouteName.SKILLS} createTitle="Create new skill" removeTitle="Remove all skills" />

      <div className="flex h-full w-full flex-row items-start justify-between gap-4 overflow-hidden md:gap-6">
        <PageContentList pending={skillsIsPending}>
          {skillsIsSuccess ? (
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
                >
                  <SkillsContent experience={skill.experience} color={skill.color} isMain={skill.isMain} />
                </PageContentCard>
              ))}
            </>
          ) : (
            <EmptyListNotification notification="Skills list is empty" />
          )}
        </PageContentList>
      </div>
    </div>
  );
};

export default Skills;
