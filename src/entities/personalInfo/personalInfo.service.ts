import {firebaseDataBase} from '@/lib/firebase/firebase';
import {update, child, ref} from 'firebase/database';
import {IPersonalInfo} from 'my-portfolio-types';
import {fetchData} from '../_db.service';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {createDataEndpoint} from '../_vm/user';

interface IUpdatePersonalInfoItemDto {
  field: keyof IPersonalInfo;
  value: string;
}

export const fetchPersonalInfo = async (userUID?: string): Promise<IPersonalInfo> => {
  return await fetchData(EndpointsList.PERSONAL_INFO, userUID);
};

export const updatePersonalInfo = async (payload: IUpdatePersonalInfoItemDto): Promise<void> => {
  try {
    return await update(child(ref(firebaseDataBase), `${createDataEndpoint({endpoint: EndpointsList.PERSONAL_INFO})}`), {
      [payload.field]: payload.value,
    });
  } catch (err) {
    console.warn(err);
    return Promise.reject(err);
  }
};
