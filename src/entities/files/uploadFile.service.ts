import {IFile, TFileList} from 'my-portfolio-types';
import {firebaseDataBase, firebaseStorage} from '@/lib/firebase/firebase';
import {getDownloadURL, ref as storageRef, StorageReference, uploadBytes, UploadResult} from '@firebase/storage';
import {getCurrentUserUID} from '@/lib/firebase/utils';
import {RoutePath} from '@/shared/router/Routes.enum';
import {child, ref, update} from '@firebase/database';
import {createDataEndpoint} from '@/entities/_vm/user';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {removeImage} from '@/entities/files/removeFile.service';

const uploadFileWithRetry = async (file: File, path: string): Promise<IFile | null> => {
  const ref: StorageReference = storageRef(firebaseStorage, path);
  const maxRetries = 5;
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const metadata = {
        contentType: file.type,
        size: file.size,
      };

      const snapshot: UploadResult = await uploadBytes(ref, file, metadata);

      const fileSrc: string = await getDownloadURL(snapshot.ref);
      const fileName: string = snapshot.ref.name;

      return {fileSrc, fileName};
    } catch (err) {
      attempts++;
      console.warn(`Attempt ${attempts} failed to upload ${file.name}:`, err);

      if (attempts >= maxRetries) {
        console.warn(`Max retries reached for ${file.name}. Skipping...`);
        return null;
      }
    }
  }

  return null;
};

export const uploadFileList = async (files: FileList, path: string): Promise<TFileList> => {
  const uploadedFileUrls: TFileList = [];

  for (let item = 0; item < files.length; item++) {
    const file = files[item];

    // const fixedFileName = file.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();

    const downloadURL = await uploadFileWithRetry(file, `${path}/${file.name}`);

    if (downloadURL) {
      uploadedFileUrls.push(downloadURL);
    }
  }

  return uploadedFileUrls;
};

export const uploadImage = async (image: File, path: string): Promise<IFile> => {
  const ref: StorageReference = storageRef(firebaseStorage, path);

  const metadata = {
    contentType: image.type,
    size: image.size,
  };

  const uploadResult: UploadResult = await uploadBytes(ref, image, metadata);
  const fileSrc: string = await getDownloadURL(storageRef(firebaseStorage, uploadResult.ref.fullPath));
  const fileName: string = uploadResult.ref.name;

  return {
    fileSrc,
    fileName,
  };
};

export const updateMainImage = async (currentImage: IFile | null, image: File): Promise<void> => {
  const userUID = getCurrentUserUID();

  if (currentImage) {
    await removeImage(currentImage.fileSrc);
  }

  if (image) {
    const uploadResult: IFile = await uploadImage(image, `${RoutePath.MAIN_IMAGE}/${image.name}`);

    await update(child(ref(firebaseDataBase), createDataEndpoint({endpoint: EndpointsList.MAIN_IMAGE, userUID})), uploadResult);
  }
};
