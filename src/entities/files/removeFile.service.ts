import {IFile, TFileList} from 'my-portfolio-types';
import {firebaseStorage} from '@/lib/firebase/firebase';
import {deleteObject, ref as storageRef} from '@firebase/storage';

const removeFileWithRetry = async (file: IFile): Promise<boolean> => {
  const {fileName, fileSrc} = file;
  const desertRef = storageRef(firebaseStorage, fileSrc);
  const maxRetries = 5;
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      await deleteObject(desertRef);
      return true;
    } catch (err) {
      attempts++;
      console.warn(`Attempt ${attempts} failed to remove ${fileName}:`, err);

      if (attempts >= maxRetries) {
        console.warn(`Max retries reached for ${fileName}. Skipping...`);
        return false;
      }
    }
  }

  return false;
};

export const removeFileList = async (files: TFileList, path: string): Promise<TFileList> => {
  const removedFileUrls: TFileList = [];

  for (let item = 0; item < files.length; item++) {
    const file = files[item];

    await removeFileWithRetry(file);
  }

  return removedFileUrls;
};

export const removeImage = async (currentFileSrc: string): Promise<void> => {
  const desertRef = storageRef(firebaseStorage, currentFileSrc);
  await deleteObject(desertRef);
};
