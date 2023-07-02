import { IProject } from 'my-portfolio-types';
import { EndpointsList } from '@/shared/Endpoints.enum';
import { fetchDataList } from '@/services/dataList.service';
import { child, push, ref, remove, set, update } from '@firebase/database';
import { firebaseDataBase, firebaseStorage } from '@/firebase';
import { TypeCreateProjectDto } from '@/shared/dto/createSkill.dto';
import { uploadFile } from '@/services/data.service';

export const fetchAllProjects = async (): Promise<Array<IProject>> => {
  return await fetchDataList(EndpointsList.PROJECTS);
};

export const createProject = async (payload: TypeCreateProjectDto): Promise<void> => {
  const {title, visibility, description, mainTechnology, releaseDate, technologies, demo, repository, file} = payload;
  const projectRef = push(ref(firebaseDataBase, EndpointsList.PROJECTS));
  let uploadedFile = undefined;

  if (file) {
    uploadedFile = await uploadFile(file, `projects/${file?.name}`);
  }

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
    fileSrc: uploadedFile?.fileSrc || '',
    fileName: uploadedFile?.fileName || '-',
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
