import { EndpointsList } from '@/shared/Endpoints.enum';
import { child, DataSnapshot, get, ref } from '@firebase/database';
import { firebaseDataBase } from '@/firebase';

export const fetchDataList = async<T> (path: EndpointsList): Promise<Array<T>> => {
  const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), path));

  const result = snapshot.val() || {};
  return Promise.resolve(Object
    .keys(result)
    .map((key) => ({ ...result[key] })) || []);
};
