import {RoutePath} from './../shared/router/Routes.enum';
import {IFile} from 'my-portfolio-types';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {child, ref, update} from '@firebase/database';
import {firebaseDataBase, firebaseStorage} from '@/lib/firebase/firebase';
import {deleteObject, getDownloadURL, ref as storageRef, StorageReference, uploadBytes, UploadResult} from '@firebase/storage';
import {get} from 'firebase/database';
import {createDataEndpoint} from './_vm/user';

export const uploadImage = async (file: File, path: string): Promise<IFile> => {
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

export const removeImage = async (currentFileSrc: string): Promise<void> => {
  const desertRef = storageRef(firebaseStorage, currentFileSrc);
  await deleteObject(desertRef);
};

export const fetchMainImage = async (userUID: string): Promise<IFile> => {
  // TODO refactor this method!
  try {
    const snapshot = await get(child(ref(firebaseDataBase), createDataEndpoint({endpoint: EndpointsList.MAIN_IMAGE, userUID})));
    const result = snapshot.val() || {};
    return Promise.resolve<IFile>(result);
  } catch (err) {
    console.warn(err);
    return Promise.reject<IFile>({});
  }
};

export const updatePersonalInfoFile = async (currentFile: IFile, file: File): Promise<void> => {
  if (currentFile) {
    await removeImage(currentFile.fileSrc);
  }

  if (file) {
    const uploadResult: IFile = await uploadImage(file, `${RoutePath.MAIN_IMAGE}/${file.name}`);

    await update(child(ref(firebaseDataBase), EndpointsList.MAIN_IMAGE), uploadResult);
  }
};
