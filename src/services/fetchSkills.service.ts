import { fetchDataList } from '@/services/fetchDataList.service';
import { EndpointsList } from '@/shared/Endpoints.enum';
import { ISkill } from 'my-portfolio-types';

export const fetchAllSkills = async (): Promise<Array<ISkill>> => {
  return await fetchDataList(EndpointsList.SKILLS);
};
