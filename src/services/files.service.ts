import { IFile } from 'my-portfolio-types';
import { Endpoints } from '@/shared/Endpoints.enum';
import { child, ref, update } from '@firebase/database';
import {firebaseDataBase, firebaseStorage} from '@/lib/firebase';
import { fetchData } from '@/services/data.service';
import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  StorageReference,
  uploadBytes,
  UploadResult
} from '@firebase/storage';
import {ProtectedRoutePath} from '@/router/Routes.enum';

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

export const fetchBio = async (): Promise<IFile> => {
  return await fetchData(Endpoints.BIO);
};

export const fetchMainImage = async (): Promise<IFile> => {
  return await fetchData(Endpoints.MAIN_IMAGE);
};

export const updatePersonalInfoFile = async (currentFile: IFile, file: File, path: ProtectedRoutePath.BIO | ProtectedRoutePath.MAIN_IMAGE): Promise<void> => {
  if (currentFile) {
    await removeImage(currentFile.fileSrc);
  }

  if (file) {
    const uploadResult: IFile = await uploadImage(file, `${path}/${file.name}`);

    await update(child(ref(firebaseDataBase), path === ProtectedRoutePath.BIO ? Endpoints.BIO : Endpoints.MAIN_IMAGE), uploadResult);
  }
};
