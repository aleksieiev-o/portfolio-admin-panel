import { fetchDataList } from '@/services/data.service';
import { EndpointsList } from '@/shared/Endpoints.enum';
import { ISkill } from 'my-portfolio-types';
import { ref, push, set } from '@firebase/database';
import { firebaseDataBase } from '@/firebase';
import { TypeCreateSkillDto } from '@/shared/dto/createSkill.dto';

export const fetchAllSkills = async (): Promise<Array<ISkill>> => {
  return await fetchDataList(EndpointsList.SKILLS);
};

export const createSkill = async (payload: TypeCreateSkillDto): Promise<void> => {
  const {title, visibility, experience, color, position} = payload;
  const skillRef = push(ref(firebaseDataBase, EndpointsList.SKILLS));

  const skill: ISkill = {
    id: skillRef.key!,
    title,
    visibility,
    experience,
    color,
    position: position,
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
  };

  return await set(skillRef, skill);
};
