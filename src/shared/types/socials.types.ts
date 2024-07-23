import {ISocial} from 'my-portfolio-types';
import {TSimpleSpread} from './types';

type TCreateSocial = Omit<ISocial, 'id' | 'createdDate' | 'updatedDate'>;

export interface ICreateSocialDto extends TSimpleSpread<TCreateSocial, {}> {}
