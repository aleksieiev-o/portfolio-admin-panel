import {firebaseDataBase} from '@/lib/firebase/firebase';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {push, ref, set} from 'firebase/database';
import {IDocument} from 'my-portfolio-types';
import {fetchAllData, fetchDataItemById, removeAllData, removeDataItemById} from '../_db.service';
import {ICreateDocumentDto} from '@/shared/types/documents.types';

export const fetchAllDocuments = async (userUID?: string): Promise<IDocument[]> => {
  return await fetchAllData(EndpointsList.DOCUMENTS, userUID);
};

export const fetchDocumentByID = async (documentID: string, userID?: string): Promise<IDocument> => {
  return await fetchDataItemById<IDocument>(EndpointsList.DOCUMENT_BY_ID, documentID, userID);
};

export const createDocument = async (payload: ICreateDocumentDto): Promise<void> => {
  const {title, visibility, lang, position} = payload;
  const documentRef = push(ref(firebaseDataBase, EndpointsList.DOCUMENTS));

  const document: IDocument = {
    id: documentRef.key!,
    title,
    visibility,
    lang,
    position: position,
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
  };

  return await set(documentRef, document);
};

export const removeDocumentById = async (id: string): Promise<void> => {
  return await removeDataItemById(EndpointsList.DOCUMENTS, id);
};

export const removeAllDocuments = async (): Promise<void> => {
  return await removeAllData(EndpointsList.DOCUMENTS);
};
