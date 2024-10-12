import {EndpointsList} from '@/shared/Endpoints.enum';
import {ISkill} from 'my-portfolio-types';
import {ref, push, set} from '@firebase/database';
import {firebaseDataBase} from '@/lib/firebase/firebase';
import {ICreateSkillDto, IUpdateSkillDto} from '@/shared/types/skills.types';
import {fetchAllData, fetchDataItemById, removeAllData, removeDataItemById, updateDataItemById} from '../_db.service';
import {createDataEndpoint} from '../_vm/user';

export const fetchAllSkills = async (userUID?: string): Promise<Array<ISkill>> => {
  return await fetchAllData(EndpointsList.SKILLS, userUID);
};

export const fetchSkillByID = async (skillID: string, userID?: string): Promise<ISkill> => {
  return await fetchDataItemById<ISkill>(EndpointsList.SKILL_BY_ID, skillID, userID);
};

export const createSkill = async (payload: ICreateSkillDto): Promise<void> => {
  const {title, visibility, isMain, experience, color, position} = payload;
  const skillRef = push(ref(firebaseDataBase, `${createDataEndpoint({endpoint: EndpointsList.SKILLS})}`));
  const skillID = skillRef.key!;

  const skill: ISkill = {
    id: skillID,
    title,
    visibility,
    isMain,
    experience,
    color,
    position,
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
  };

  return await set(skillRef, skill);
};

export const updateSkill = async (payload: IUpdateSkillDto): Promise<void> => {
  return await updateDataItemById(EndpointsList.SKILL_BY_ID, payload.id, payload);
};

export const removeSkillById = async (id: string): Promise<void> => {
  return await removeDataItemById(EndpointsList.SKILLS, id);
};

export const removeAllSkills = async (): Promise<void> => {
  return await removeAllData(EndpointsList.SKILLS);
};
