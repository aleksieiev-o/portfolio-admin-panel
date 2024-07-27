import {IDocument} from 'my-portfolio-types';
import {TSimpleSpread} from './types';

type TCreateDocument = Omit<IDocument, 'id' | 'createdDate' | 'updatedDate'>;

export interface ICreateDocumentDto extends TSimpleSpread<TCreateDocument, {}> {}
