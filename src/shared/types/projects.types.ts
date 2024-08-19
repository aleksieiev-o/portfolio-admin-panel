import {IProject} from 'my-portfolio-types';
import {TSimpleSpread} from './types';

type TCreateProject = Omit<IProject, 'id' | 'createdDate' | 'updatedDate' | 'screensList'> & {screensList: FileList};

type TUpdateProject = Omit<IProject, 'createdDate' | 'updatedDate' | 'screensList'> & {screensList?: FileList};

export interface ICreateProjectDto extends TSimpleSpread<TCreateProject, {}> {}

export interface IUpdateProjectDto extends TSimpleSpread<TUpdateProject, {}> {}
