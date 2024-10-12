import {ISkill} from 'my-portfolio-types';
import {TSimpleSpread} from './types';

type TCreateSkill = Omit<ISkill, 'id' | 'createdDate' | 'updatedDate'>;

type TUpdateSkill = Omit<ISkill, 'createdDate' | 'updatedDate'>;

export interface ICreateSkillDto extends TSimpleSpread<TCreateSkill, {}> {}

export interface IUpdateSkillDto extends TSimpleSpread<TUpdateSkill, {}> {}
