import { EndpointsList } from '@/shared/Endpoints.enum';
import { child, DataSnapshot, get, ref, remove, set, update } from '@firebase/database';
import { firebaseDataBase } from '@/firebase';

export const fetchDataList = async<T> (path: EndpointsList): Promise<Array<T>> => {
  const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), path));

  const result = snapshot.val() || {};
  return Promise.resolve(Object
    .keys(result)
    .map((key) => ({ ...result[key] })) || []);
};

export const updateById = async<T> (payload: T, path: EndpointsList, id: string): Promise<void> => {
  return await update(child(ref(firebaseDataBase), `${path}/${id}`), payload);
};

export const removeById = async (path: EndpointsList, id: string): Promise<void> => {
  return await remove(child(ref(firebaseDataBase), `${path}/${id}`));
};

export const removeAll = async (path: EndpointsList): Promise<void> => {
  return await set(ref(firebaseDataBase, path), null);
};
