import {Endpoints, EndpointsList} from '@/shared/Endpoints.enum';
import {
  child,
  DataSnapshot,
  get,
  ref,
  remove,
  set,
  update,
} from '@firebase/database';
import {IDocument, IProject, ISkill, ISocial} from 'my-portfolio-types';
import {firebaseDataBase} from '@/lib/firebase/firebase';

interface IUpdatePayload<T> {
  data: Partial<T>;
}

export const fetchDataList = async <T>(
  path: EndpointsList,
): Promise<Array<T>> => {
  const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), path));

  const result = snapshot.val() || {};
  return Promise.resolve(
    Object.keys(result).map((key) => ({...result[key]})) || [],
  );
};

export const fetchData = async <T>(path: Endpoints): Promise<T> => {
  const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), path));
  return snapshot.val() || {};
};

export const fetchById = async <T>(
  path: EndpointsList,
  id: string,
): Promise<T> => {
  const snapshot: DataSnapshot = await get(
    child(ref(firebaseDataBase), `${path}/${id}`),
  );
  return snapshot.val() || {};
};

export const updateById = async <T>(
  payload: T,
  path: EndpointsList,
  id: string,
): Promise<void> => {
  return await update(child(ref(firebaseDataBase), `${path}/${id}`), {
    ...payload,
    updatedDate: new Date().toISOString(),
  });
};

export const removeById = async <
  T extends IProject | ISkill | ISocial | IDocument,
>(
  payload: IUpdatePayload<T>,
  path: EndpointsList,
): Promise<void> => {
  return await remove(
    child(ref(firebaseDataBase), `${path}/${payload.data.id}`),
  );
};

export const removeAll = async <T>(path: EndpointsList): Promise<void> => {
  return await set(ref(firebaseDataBase, path), null);
};
