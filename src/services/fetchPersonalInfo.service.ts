import { IPersonalInfo } from 'my-portfolio-types';
import { fetchData } from '@/services/fetchData.service';
import { Endpoints } from '@/shared/Endpoints.enum';

export const fetchPersonalInfo = async (): Promise<IPersonalInfo> => {
  return await fetchData(Endpoints.INFO);
};
