import {firebaseDataBase, firebaseStorage} from '@/lib/firebase/firebase';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {push, ref, update, child, set} from 'firebase/database';
import {deleteObject, ref as storageRef} from '@firebase/storage';
import {IProject} from 'my-portfolio-types';
import {fetchAllData, removeAllData, removeDataItemById} from '../_db.service';
import {ICreateProjectDto} from '@/shared/types/projects.types';
import {removeImage, uploadImage} from '../files.service';

export const fetchAllProjects = async (userUID?: string): Promise<IProject[]> => {
  return await fetchAllData<IProject>(EndpointsList.PROJECTS, userUID);
};

export const createProject = async (payload: ICreateProjectDto): Promise<void> => {
  const {title, visibility, description, mainTechnology, releaseDate, technologies, demo, position, repository, file} = payload;
  const projectRef = push(ref(firebaseDataBase, EndpointsList.PROJECTS));
  let uploadedFile = undefined;

  if (file) {
    uploadedFile = await uploadImage(file, `projects/${file?.name}`);
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
    preview: {
      fileSrc: uploadedFile?.fileSrc || '',
      fileName: uploadedFile?.fileName || '',
    },
    screensList: [], // TODO add array of files
    position: position,
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
  };

  return await set(projectRef, project);
};

export const updateProjectById = async (payload: ICreateProjectDto, id: string): Promise<void> => {
  if (payload.file) {
    // await removeImage(payload.preview.fileSrc);

    const uploadedFile = await uploadImage(payload.file, `projects/${payload.file?.name}`);

    return await update(child(ref(firebaseDataBase), `${EndpointsList.PROJECTS}/${id}`), {
      ...payload,
      preview: {
        fileSrc: uploadedFile?.fileSrc || '',
        fileName: uploadedFile?.fileName || '',
      },
      screensList: [], // TODO add array of files
      releaseDate: new Date(payload.releaseDate).toISOString(),
      updatedDate: new Date().toISOString(),
    });
  }

  return await update(child(ref(firebaseDataBase), `${EndpointsList.PROJECTS}/${id}`), {
    ...payload,
    releaseDate: new Date(payload.releaseDate).toISOString(),
    updatedDate: new Date().toISOString(),
  });
};

export const removeProjectById = async (payload: IProject, id: string): Promise<void> => {
  if (payload.preview.fileSrc) {
    await removeImage(payload.preview.fileSrc);
  }

  // TODO add remove the list of files from screensList

  return await removeDataItemById(EndpointsList.PROJECTS, id);
};

export const removeAllProjects = async (payload: Array<IProject>): Promise<void> => {
  const desertRefList = payload.map((item) => deleteObject(storageRef(firebaseStorage, item.preview.fileSrc)));
  // TODO add remove the list of files from screensList
  await Promise.all(desertRefList);
  await removeAllData(EndpointsList.PROJECTS);
};
