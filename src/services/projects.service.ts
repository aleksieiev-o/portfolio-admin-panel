import { IProject } from 'my-portfolio-types';
import { EndpointsList } from '@/shared/Endpoints.enum';
import { fetchDataList } from '@/services/data.service';
import { push, ref, set } from '@firebase/database';
import { firebaseDataBase } from '@/firebase';
import {TypeCreateProjectDto} from '@/shared/dto/createProject.dto';
import { uploadFile } from '@/services/data.service';

export const fetchAllProjects = async (): Promise<Array<IProject>> => {
  return await fetchDataList(EndpointsList.PROJECTS);
};

export const createProject = async (payload: TypeCreateProjectDto): Promise<void> => {
  const {title, visibility, description, mainTechnology, releaseDate, technologies, demo, position, repository, file} = payload;
  const projectRef = push(ref(firebaseDataBase, EndpointsList.PROJECTS));
  let uploadedFile = undefined;

  if (file) {
    uploadedFile = await uploadFile(file, `projects/${file?.name}`);
  }

  const project: IProject = {
    id: projectRef.key!,
    title: title,
    visibility: visibility,
    description: description,
    mainTechnology: mainTechnology,
    releaseDate: new Date(releaseDate).toISOString(),
    technologies: technologies.length ? technologies : [mainTechnology],
    demo: demo,
    repository: repository,
    fileSrc: uploadedFile?.fileSrc,
    fileName: uploadedFile?.fileName,
    position: position,
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
  };

  return await set(projectRef, project);
};
