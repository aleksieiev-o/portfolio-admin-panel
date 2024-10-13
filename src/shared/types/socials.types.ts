import {ISocial} from 'my-portfolio-types';
import {TSimpleSpread} from './types';

type TCreateSocial = Omit<ISocial, 'id' | 'createdDate' | 'updatedDate'>;

type TUpdateSocial = Omit<ISocial, 'createdDate' | 'updatedDate'>;

export interface ICreateSocialDto extends TSimpleSpread<TCreateSocial, {}> {}

export interface IUpdateSocialDto extends TSimpleSpread<TUpdateSocial, {}> {}
