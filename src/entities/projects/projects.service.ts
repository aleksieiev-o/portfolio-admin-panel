import {ICreateProjectDto, IUpdateProjectDto} from './../../shared/types/projects.types';
import {firebaseDataBase} from '@/lib/firebase/firebase';
import {EndpointsImagesList, EndpointsList} from '@/shared/Endpoints.enum';
import {push, ref, set} from 'firebase/database';
import {IProject} from 'my-portfolio-types';
import {fetchAllData, fetchDataItemById, removeAllData, removeDataItemById, updateDataItemById} from '../_db.service';

import {uploadFileList} from '../files.service';
import {createDataEndpoint, createDataItemEndpoint} from '../_vm/user';

export const fetchAllProjects = async (userUID?: string): Promise<IProject[]> => {
  return await fetchAllData<IProject>(EndpointsList.PROJECTS, userUID);
};

export const fetchProjectByID = async (projectID: string, userID?: string): Promise<IProject> => {
  return await fetchDataItemById<IProject>(EndpointsList.PROJECT_BY_ID, projectID, userID);
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

export const updateProject = async (payload: IUpdateProjectDto, id: string): Promise<void> => {
  const {screensList} = payload;
  let fileList = [];

  // TODO add a removing of the marked file to remove using func removeFileList

  if (screensList && screensList.length) {
    fileList = await uploadFileList(screensList, createDataItemEndpoint({endpoint: EndpointsImagesList.PROJECTS, itemId: id}));
    await updateDataItemById(EndpointsList.PROJECT_BY_ID, id, {...payload, screensList: fileList});
  } else {
    // TODO value screensList: [] clears the screensList in the DB
    await updateDataItemById(EndpointsList.PROJECT_BY_ID, id, {...payload, screensList: []});
  }
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
