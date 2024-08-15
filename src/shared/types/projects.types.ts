import {IProject} from 'my-portfolio-types';
import {TSimpleSpread} from './types';

type TCreateProject = Omit<IProject, 'id' | 'createdDate' | 'updatedDate' | 'screensList'> & {screensList: FileList};

export interface ICreateProjectDto extends TSimpleSpread<TCreateProject, {}> {}
