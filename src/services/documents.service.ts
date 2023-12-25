import {IDocument} from 'my-portfolio-types';
import {fetchDataList, removeAll, removeById} from '@/services/data.service';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {child, push, ref, set, update} from '@firebase/database';
import {firebaseDataBase} from '@/lib/firebase';
import {TypeCreateDocumentDto} from '@/shared/dto/createDocument.dto';

export const fetchAllDocuments = async (): Promise<Array<IDocument>> => {
  return await fetchDataList(EndpointsList.DOCUMENTS);
};

export const createDocument = async (payload: TypeCreateDocumentDto): Promise<void> => {
  const {title, visibility, lang, position} = payload;
  const projectRef = push(ref(firebaseDataBase, EndpointsList.DOCUMENTS));

  const project: IDocument = {
    id: projectRef.key!,
    title: title,
    visibility: visibility,
    lang: lang,
    position: position,
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
  };

  return await set(projectRef, project);
};

export const updateDocumentById = async (payload: TypeCreateDocumentDto, id: string): Promise<void> => {
  return await update(child(ref(firebaseDataBase), `${EndpointsList.DOCUMENTS}/${id}`), {
    ...payload,
    updatedDate: new Date().toISOString(),
  });
};

export const removeDocumentById = async (payload: IDocument, path: EndpointsList): Promise<void> => {
  return await removeById({data: payload}, path);
};

export const removeAllDocuments = async (): Promise<void> => {
  await removeAll<Array<IDocument>>(EndpointsList.DOCUMENTS);
};
