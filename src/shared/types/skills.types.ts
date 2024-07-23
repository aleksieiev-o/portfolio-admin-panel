import {ISkill} from 'my-portfolio-types';
import {TSimpleSpread} from './types';

type TCreateSkill = Omit<ISkill, 'id' | 'createdDate' | 'updatedDate'>;

export interface ICreateSkillDto extends TSimpleSpread<TCreateSkill, {}> {}
