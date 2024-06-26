import {IProject} from 'my-portfolio-types';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {fetchDataList, removeAll, removeById} from '@/services/data.service';
import {child, push, ref, set, update} from '@firebase/database';
import {firebaseDataBase, firebaseStorage} from '@/lib/firebase/firebase';
import {TypeCreateProjectDto} from '@/shared/dto/createProject.dto';
import {deleteObject, ref as storageRef} from '@firebase/storage';
import {removeImage, uploadImage} from '@/services/files.service';

export const fetchAllProjects = async (): Promise<Array<IProject>> => {
  return await fetchDataList(EndpointsList.PROJECTS);
};

export const createProject = async (
  payload: TypeCreateProjectDto,
): Promise<void> => {
  const {
    title,
    visibility,
    description,
    mainTechnology,
    releaseDate,
    technologies,
    demo,
    position,
    repository,
    file,
  } = payload;
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
    fileSrc: uploadedFile?.fileSrc || '',
    fileName: uploadedFile?.fileName || '',
    position: position,
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
  };

  return await set(projectRef, project);
};

export const updateProjectById = async (
  payload: TypeCreateProjectDto,
  id: string,
): Promise<void> => {
  if (payload.file) {
    await removeImage(payload.fileSrc);

    const uploadedFile = await uploadImage(
      payload.file,
      `projects/${payload.file?.name}`,
    );

    return await update(
      child(ref(firebaseDataBase), `${EndpointsList.PROJECTS}/${id}`),
      {
        ...payload,
        fileSrc: uploadedFile?.fileSrc || '',
        fileName: uploadedFile?.fileName || '',
        releaseDate: new Date(payload.releaseDate).toISOString(),
        updatedDate: new Date().toISOString(),
      },
    );
  }

  return await update(
    child(ref(firebaseDataBase), `${EndpointsList.PROJECTS}/${id}`),
    {
      ...payload,
      releaseDate: new Date(payload.releaseDate).toISOString(),
      updatedDate: new Date().toISOString(),
    },
  );
};

export const removeProjectById = async (
  payload: IProject,
  path: EndpointsList,
): Promise<void> => {
  if (payload.fileSrc) {
    await removeImage(payload.fileSrc);
  }

  return await removeById({data: payload}, path);
};

export const removeAllProjects = async (
  payload: Array<IProject>,
): Promise<void> => {
  const desertRefList = payload.map((item) =>
    deleteObject(storageRef(firebaseStorage, item.fileSrc)),
  );
  await Promise.all(desertRefList);
  await removeAll<Array<IProject>>(EndpointsList.PROJECTS);
};
