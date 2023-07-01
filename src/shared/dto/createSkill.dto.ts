import { IProject } from 'my-portfolio-types';

export type TypeCreateProjectDto = Omit<IProject, 'id'>;
