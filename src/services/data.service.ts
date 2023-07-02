import { Endpoints } from '@/shared/Endpoints.enum';
import { child, DataSnapshot, get, ref } from '@firebase/database';
import { getDownloadURL, ref as storageRef, StorageReference, uploadBytes, UploadResult } from '@firebase/storage';
import { firebaseDataBase, firebaseStorage } from '@/firebase';

export const fetchData = async<T> (path: Endpoints): Promise<T> => {
  const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), path));

  return snapshot.val() || {};
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
