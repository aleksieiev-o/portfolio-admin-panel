import {IPersonalInfo} from 'my-portfolio-types';
import {Endpoints} from '@/shared/Endpoints.enum';
import {child, update, ref} from '@firebase/database';
import {firebaseDataBase} from '@/lib/firebase/firebase';
import {fetchData} from '@/services/data.service';

interface IUpdatePayload {
  field: keyof IPersonalInfo;
  value: string;
}

export const fetchPersonalInfo = async (): Promise<IPersonalInfo> => {
  return await fetchData(Endpoints.PERSONAL_INFO);
};

export const updatePersonalInfo = async (
  payload: IUpdatePayload,
): Promise<void> => {
  return await update(child(ref(firebaseDataBase), Endpoints.PERSONAL_INFO), {
    [payload.field]: payload.value,
  });
};
