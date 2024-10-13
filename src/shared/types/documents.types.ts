import {IDocument} from 'my-portfolio-types';
import {TSimpleSpread} from './types';

type TCreateDocument = Omit<IDocument, 'id' | 'createdDate' | 'updatedDate'>;

type TUpdateDocument = Omit<IDocument, 'createdDate' | 'updatedDate'>;

export interface ICreateDocumentDto extends TSimpleSpread<TCreateDocument, {}> {}

export interface IUpdateDocumentDto extends TSimpleSpread<TUpdateDocument, {}> {}
