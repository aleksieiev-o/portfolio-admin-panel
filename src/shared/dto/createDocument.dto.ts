import {IDocument} from 'my-portfolio-types';

export type TypeCreateDocumentDto = Omit<IDocument, 'id' | 'fileName' | 'createdDate' | 'updatedDate'> & {fileSrc?: string, file?: File};
