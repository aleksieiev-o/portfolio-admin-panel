import { IFile } from 'my-portfolio-types';
import { Endpoints } from '@/shared/Endpoints.enum';
import { child, ref, update } from '@firebase/database';
import { firebaseDataBase } from '@/firebase';
import { fetchData, uploadFile } from '@/services/data.service';

export const fetchBio = async (): Promise<IFile> => {
  return await fetchData(Endpoints.BIO);
};

export const fetchMainImage = async (): Promise<IFile> => {
  return await fetchData(Endpoints.MAIN_IMAGE);
};

export const updateFile = async (file: File, path: 'bio' | 'main-image'): Promise<void> => {
  let uploadedFile = undefined;

  if (file) {
    uploadedFile = await uploadFile(file, `${path}/${file.name}`);

    const payload: IFile = {fileSrc: uploadedFile.fileSrc, fileName: uploadedFile.fileName};

    await update(child(ref(firebaseDataBase), path === 'bio' ? Endpoints.BIO : Endpoints.MAIN_IMAGE), payload);
  }
};
