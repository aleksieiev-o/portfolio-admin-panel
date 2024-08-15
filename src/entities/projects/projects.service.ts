import {firebaseDataBase} from '@/lib/firebase/firebase';
import {EndpointsImagesList, EndpointsList} from '@/shared/Endpoints.enum';
import {push, ref, set} from 'firebase/database';
import {IProject} from 'my-portfolio-types';
import {fetchAllData, removeAllData, removeDataItemById} from '../_db.service';
import {ICreateProjectDto} from '@/shared/types/projects.types';
import {uploadFileList} from '../files.service';
import {createDataEndpoint, createDataItemEndpoint} from '../_vm/user';

export const fetchAllProjects = async (userUID?: string): Promise<IProject[]> => {
  return await fetchAllData<IProject>(EndpointsList.PROJECTS, userUID);
};

export const createProject = async (payload: ICreateProjectDto): Promise<void> => {
  const {title, visibility, description, mainTechnology, releaseDate, technologies, demo, position, repository, screensList} = payload;
  const projectRef = push(ref(firebaseDataBase, `${createDataEndpoint({endpoint: EndpointsList.PROJECTS})}`));
  const projectID = projectRef.key!;

  const fileList = await uploadFileList(screensList, createDataItemEndpoint({endpoint: EndpointsImagesList.PROJECTS, itemId: projectID}));

  const project: IProject = {
    id: projectID,
    title,
    visibility,
    description,
    mainTechnology,
    releaseDate,
    technologies,
    demo,
    repository,
    screensList: fileList,
    position,
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
  };

  return await set(projectRef, project);
};

export const removeProjectById = async (payload: IProject, id: string): Promise<void> => {
  // if (payload.preview.fileSrc) {
  //   await removeImage(payload.preview.fileSrc);
  // }

  // TODO add remove the list of files from screensList

  return await removeDataItemById(EndpointsList.PROJECTS, id);
};

export const removeAllProjects = async (payload: Array<IProject>): Promise<void> => {
  // const desertRefList = payload.map((item) => deleteObject(storageRef(firebaseStorage, item.preview.fileSrc)));
  // TODO add remove the list of files from screensList
  // await Promise.all(desertRefList);
  await removeAllData(EndpointsList.PROJECTS);
};
