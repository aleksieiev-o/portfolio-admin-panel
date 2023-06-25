import { IFile } from 'my-portfolio-types';
import { fetchData } from '@/services/fetchData.service';
import { Endpoints } from '@/shared/Endpoints.enum';

export const fetchBio = async (): Promise<IFile> => {
  return await fetchData(Endpoints.BIO);
};
