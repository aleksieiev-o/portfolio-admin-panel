import {ICreateProjectDto, IUpdateProjectDto} from '@/shared/types/projects.types';
import {firebaseDataBase} from '@/lib/firebase/firebase';
import {EndpointsImagesList, EndpointsList} from '@/shared/Endpoints.enum';
import {push, ref, set} from 'firebase/database';
import {IProject} from 'my-portfolio-types';
import {fetchAllData, fetchDataItemById, removeAllData, removeDataItemById, updateDataItemById} from '../_db.service';
import {createDataEndpoint, createDataItemEndpoint} from '../_vm/user';
import {uploadFileList} from '@/entities/files/uploadFile.service';
import {removeFileList} from '../files/removeFile.service';

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

export const updateProject = async (payload: IUpdateProjectDto): Promise<void> => {
  const {screensList, id} = payload;
  let fileList = [];

  // TODO add a removing of the marked file to remove using func removeFileList

  if (screensList && screensList.length) {
    fileList = await uploadFileList(screensList, createDataItemEndpoint({endpoint: EndpointsImagesList.PROJECTS, itemId: id}));
    await updateDataItemById(EndpointsList.PROJECT_BY_ID, id, {...payload, screensList: fileList});
  } else {
    // TODO payload screensList: [] clears the screensList in the DB
    await updateDataItemById(EndpointsList.PROJECT_BY_ID, id, {...payload, screensList: []});
  }
};

export const removeProjectById = async (payload: IProject, id: string): Promise<void> => {
  if (payload.screensList?.length) {
    await removeFileList(payload.screensList);
  }

  return await removeDataItemById(EndpointsList.PROJECTS, id);
};

export const removeAllProjects = async (): Promise<void> => {
  const projects = await fetchAllProjects();

  for (const item of projects) {
    if (item.screensList?.length) {
      await removeFileList(item.screensList);
    }
  }

  return await removeAllData(EndpointsList.PROJECTS);
};
