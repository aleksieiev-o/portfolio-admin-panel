import { IProject } from 'my-portfolio-types';
import { EndpointsList } from '@/shared/Endpoints.enum';
import { fetchDataList } from '@/services/fetchDataList.service';
import { child, push, ref, remove, set, update } from '@firebase/database';
import { firebaseDataBase } from '@/firebase';
import { TypeCreateProjectDto } from '@/shared/dto/createSkill.dto';

export const fetchAllProjects = async (): Promise<Array<IProject>> => {
  return await fetchDataList(EndpointsList.PROJECTS);
};

export const createProject = async (payload: TypeCreateProjectDto): Promise<void> => {
  const {title, visibility, description, mainTechnology, releaseDate, technologies, demo, repository, fileSrc, fileName} = payload;
  const projectRef = push(ref(firebaseDataBase, EndpointsList.PROJECTS));

  const project: IProject = {
    id: projectRef.key!,
    title: title || '-',
    visibility: visibility || false,
    description: description || '-',
    mainTechnology: mainTechnology || '-',
    releaseDate: new Date(releaseDate).toLocaleDateString('en-US') || releaseDate,
    technologies: technologies.length ? technologies : ['-'],
    demo: demo || '-',
    repository: repository || '-',
    fileSrc: fileSrc || '',
    fileName: fileName || '-',
  };

  return await set(projectRef, project);
};

export const updateProject = async (payload: IProject, id: string): Promise<void> => {
  return await update(child(ref(firebaseDataBase), `${EndpointsList.PROJECTS}/${id}`), payload);
};

export const removeProject = async (id: string): Promise<void> => {
  return await remove(child(ref(firebaseDataBase), `${EndpointsList.PROJECTS}/${id}`));
};

export const removeAllProjects = async (): Promise<void> => {
  return await set(ref(firebaseDataBase, EndpointsList.PROJECTS), null);
};
