import { Endpoints, EndpointsList } from '@/shared/Endpoints.enum';
import { child, DataSnapshot, get, ref, remove, set, update } from '@firebase/database';
import { firebaseDataBase, firebaseStorage } from '@/lib/firebase';
import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  StorageReference,
  uploadBytes,
  UploadResult
} from '@firebase/storage';
import {IProject} from 'my-portfolio-types';
import {TypeCreateSkillDto} from '@/shared/dto/createSkill.dto';
import {TypeCreateSocialDto} from '@/shared/dto/createSocial.dto';
import {TypeCreateProjectDto} from '@/shared/dto/createProject.dto';

export const removeFile = async (currentFileSrc: string): Promise<void> => {
  const desertRef = storageRef(firebaseStorage, currentFileSrc);
  await deleteObject(desertRef);
};

/** removeAllFiles works only for projects list */
export const removeAllFiles = async (payload: Array<IProject>): Promise<void> => {
  const desertRefList = payload.map((item) => deleteObject(storageRef(firebaseStorage, item.fileSrc)));
  await Promise.all(desertRefList);
};

export const fetchDataList = async<T> (path: EndpointsList): Promise<Array<T>> => {
  const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), path));

  const result = snapshot.val() || {};
  return Promise.resolve(Object
    .keys(result)
    .map((key) => ({ ...result[key] })) || []);
};

export const fetchData = async<T> (path: Endpoints): Promise<T> => {
  const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), path));
  return snapshot.val() || {};
};

export const fetchById = async <T> (path: EndpointsList, id: string): Promise<T> => {
  const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), `${path}/${id}`));
  return snapshot.val() || {};
};

export const updateById = async<T> (payload: T, path: EndpointsList, id: string): Promise<void> => {
  if (payload.file) {
    if (payload.fileSrc) {
      await removeFile(payload.fileSrc);
    }

    const uploadedFile = await uploadFile(payload.file, `projects/${payload.file?.name}`);

    return await update(child(ref(firebaseDataBase), `${path}/${id}`), {
      ...payload,
      fileSrc: uploadedFile?.fileSrc || '',
      fileName: uploadedFile?.fileName || '',
      updatedDate: new Date().toISOString(),
    });
  }

  return await update(child(ref(firebaseDataBase), `${path}/${id}`), {...payload, updatedDate: new Date().toISOString()});
};

export const removeById = async<T> (payload: T, path: EndpointsList): Promise<void> => {
  if (payload.fileSrc) {
    await removeFile(payload.fileSrc);
  }

  return await remove(child(ref(firebaseDataBase), `${path}/${payload.id}`));
};

export const removeAll = async<T> (path: EndpointsList): Promise<void> => {
  return await set(ref(firebaseDataBase, path), null);
};

export const uploadFile = async (file: File, path: string): Promise<{fileSrc: string, fileName: string}> => {
  const ref: StorageReference = storageRef(firebaseStorage, path);

  const metadata = {
    contentType: file.type,
    size: file.size,
  };

  const uploadResult: UploadResult = await uploadBytes(ref, file, metadata);
  const fileSrc: string = await getDownloadURL(storageRef(firebaseStorage, uploadResult.ref.fullPath));
  const fileName: string = uploadResult.ref.name;

  return {
    fileSrc,
    fileName,
  };
};
