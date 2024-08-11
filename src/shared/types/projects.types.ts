import {IProject} from 'my-portfolio-types';
import {TSimpleSpread} from './types';

type TCreateProject = Omit<IProject, 'id' | 'screensList' | 'createdDate' | 'updatedDate'> & {fileSrc?: string; file?: File};

export interface ICreateProjectDto extends TSimpleSpread<TCreateProject, {}> {}
