import {ISkill} from 'my-portfolio-types';

export type TypeCreateSkillDto = Omit<
  ISkill,
  'id' | 'createdDate' | 'updatedDate'
>;
