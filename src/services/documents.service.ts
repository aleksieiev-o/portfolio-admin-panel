import {IDocument} from 'my-portfolio-types';
import {fetchDataList, removeAll, removeById} from '@/services/data.service';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {child, push, ref, set, update} from '@firebase/database';
import {firebaseDataBase, firebaseStorage} from '@/lib/firebase';
import {removeImage, uploadImage} from '@/services/files.service';
import {deleteObject, ref as storageRef} from '@firebase/storage';
import {TypeCreateDocumentDto} from '@/shared/dto/createDocument.dto';

export const fetchAllDocuments = async (): Promise<Array<IDocument>> => {
  return await fetchDataList(EndpointsList.DOCUMENTS);
};

export const createDocument = async (payload: TypeCreateDocumentDto): Promise<void> => {
  const {title, visibility, lang, position, file} = payload;
  const projectRef = push(ref(firebaseDataBase, EndpointsList.DOCUMENTS));
  let uploadedFile = undefined;

  if (file) {
    uploadedFile = await uploadImage(file, `documents/${file?.name}`);
  }

  const project: IDocument = {
    id: projectRef.key!,
    title: title,
    visibility: visibility,
    lang: lang,
    fileSrc: uploadedFile?.fileSrc || '',
    fileName: uploadedFile?.fileName || '',
    position: position,
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
  };

  return await set(projectRef, project);
};

export const updateDocumentById = async (payload: TypeCreateDocumentDto, id: string): Promise<void> => {
  if (payload.file) {
    await removeImage(payload.fileSrc);

    const uploadedFile = await uploadImage(payload.file, `documents/${payload.file?.name}`);

    return await update(child(ref(firebaseDataBase), `${EndpointsList.DOCUMENTS}/${id}`), {
      ...payload,
      fileSrc: uploadedFile?.fileSrc || '',
      fileName: uploadedFile?.fileName || '',
      updatedDate: new Date().toISOString(),
    });
  }

  return await update(child(ref(firebaseDataBase), `${EndpointsList.DOCUMENTS}/${id}`), {
    ...payload,
    updatedDate: new Date().toISOString(),
  });
};

export const removeDocumentById = async (payload: IDocument, path: EndpointsList): Promise<void> => {
  if (payload.fileSrc) {
    await removeImage(payload.fileSrc);
  }

  return await removeById({data: payload}, path);
};

export const removeAllDocuments = async (payload: Array<IDocument>): Promise<void> => {
  const desertRefList = payload.map((item) => deleteObject(storageRef(firebaseStorage, item.fileSrc)));
  await Promise.all(desertRefList);
  await removeAll<Array<IDocument>>(EndpointsList.DOCUMENTS);
};
