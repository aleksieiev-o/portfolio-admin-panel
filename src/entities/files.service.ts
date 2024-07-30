import {RoutePath} from './../shared/router/Routes.enum';
import {IFile} from 'my-portfolio-types';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {child, ref, update} from '@firebase/database';
import {firebaseDataBase, firebaseStorage} from '@/lib/firebase/firebase';
import {deleteObject, getDownloadURL, ref as storageRef, StorageReference, uploadBytes, UploadResult} from '@firebase/storage';
import {get} from 'firebase/database';
import {createDataEndpoint} from './_vm/user';
import {getCurrentUserUID} from '@/lib/firebase/utils';

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

export const removeImage = async (currentFileSrc: string): Promise<void> => {
  const desertRef = storageRef(firebaseStorage, currentFileSrc);
  await deleteObject(desertRef);
};

export const fetchMainImage = async (userUID?: string): Promise<IFile | null> => {
  // TODO refactor this method!
  try {
    const snapshot = await get(child(ref(firebaseDataBase), createDataEndpoint({endpoint: EndpointsList.MAIN_IMAGE, userUID})));
    const result = snapshot.val() || null;
    return Promise.resolve<IFile | null>(result);
  } catch (err) {
    console.warn(err);
    return Promise.reject<null>(null);
  }
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
