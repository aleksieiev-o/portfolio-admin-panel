import { IProject } from 'my-portfolio-types';

// export type TypeCreateProjectDto = Omit<IProject, 'id' | 'fileSrc' | 'fileName'> & {file?: File};

export type TypeCreateProjectDto = Omit<IProject, 'id' | 'fileName' | 'createdDate' | 'updatedDate'> & {fileSrc?: string, file?: File};
