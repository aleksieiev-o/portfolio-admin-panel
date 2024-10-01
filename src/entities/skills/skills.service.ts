import {EndpointsList} from '@/shared/Endpoints.enum';
import {ISkill} from 'my-portfolio-types';
import {ref, push, set} from '@firebase/database';
import {firebaseDataBase} from '@/lib/firebase/firebase';
import {ICreateSkillDto} from '@/shared/types/skills.types';
import {fetchAllData, fetchDataItemById, removeAllData, removeDataItemById} from '../_db.service';

export const fetchAllSkills = async (userUID?: string): Promise<Array<ISkill>> => {
  return await fetchAllData(EndpointsList.SKILLS, userUID);
};

export const fetchSkillByID = async (skillID: string, userID?: string): Promise<ISkill> => {
  return await fetchDataItemById<ISkill>(EndpointsList.SKILL_BY_ID, skillID, userID);
};

export const createSkill = async (payload: ICreateSkillDto): Promise<void> => {
  const {title, visibility, isMain, experience, color, position} = payload;
  const skillRef = push(ref(firebaseDataBase, EndpointsList.SKILLS));

  const skill: ISkill = {
    id: skillRef.key!,
    title,
    visibility,
    isMain,
    experience,
    color,
    position: position,
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
  };

  return await set(skillRef, skill);
};

export const removeSkillById = async (id: string): Promise<void> => {
  return await removeDataItemById(EndpointsList.SKILLS, id);
};

export const removeAllSkills = async (): Promise<void> => {
  return await removeAllData(EndpointsList.SKILLS);
};
