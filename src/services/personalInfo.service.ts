import { IPersonalInfo } from 'my-portfolio-types';
import { fetchData } from '@/services/data.service';
import { Endpoints } from '@/shared/Endpoints.enum';
import { child, update, ref } from '@firebase/database';
import { firebaseDataBase } from '@/firebase';

export const fetchPersonalInfo = async (): Promise<IPersonalInfo> => {
  return await fetchData(Endpoints.PERSONAL_INFO);
};

export const updatePersonalInfo = async (payload: {[key: keyof IPersonalInfo]: string}): Promise<void> => {
  return await update(child(ref(firebaseDataBase), Endpoints.PERSONAL_INFO), payload);
};
