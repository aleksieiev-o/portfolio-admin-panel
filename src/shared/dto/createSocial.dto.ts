import {ISocial} from 'my-portfolio-types';

export type TypeCreateSocialDto = Omit<
  ISocial,
  'id' | 'createdDate' | 'updatedDate'
>;
