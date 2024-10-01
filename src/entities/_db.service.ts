import {child, get, ref, remove, set, update} from '@firebase/database';
import {firebaseDataBase} from '@/lib/firebase/firebase';
import {createDataEndpoint, createDataItemEndpoint} from '@/entities/_vm/user';
import {EndpointsList} from '@/shared/Endpoints.enum';

export const fetchAllData = async <T>(endpoint: EndpointsList, userUID?: string): Promise<T[]> => {
  try {
    const snapshot = await get(child(ref(firebaseDataBase), createDataEndpoint({endpoint, userUID})));
    const result = snapshot.val() || {};
    return Promise.resolve<T[]>([...new Map<string, T>(Object.entries<T>(result)).values()]);
  } catch (err) {
    console.warn(err);
    return Promise.reject<T[]>([]);
  }
};

export const fetchData = async <T>(endpoint: EndpointsList, userUID?: string): Promise<T> => {
  try {
    const snapshot = await get(child(ref(firebaseDataBase), createDataEndpoint({endpoint, userUID})));
    return snapshot.val() || {};
  } catch (err) {
    console.warn(err);
    return Promise.reject<T>({});
  }
};

export const fetchDataItemById = async <T>(endpoint: EndpointsList, itemId: string, userUID?: string): Promise<T> => {
  try {
    const snapshot = await get(child(ref(firebaseDataBase), createDataItemEndpoint({endpoint, itemId, userUID})));
    return Promise.resolve<T>(snapshot.val() || {});
  } catch (err) {
    console.warn(err);
    return Promise.reject<T>({});
  }
};

export const updateDataItemById = async <T>(endpoint: EndpointsList, itemId: string, payload: T): Promise<void> => {
  try {
    const currentItem = await fetchDataItemById<T>(endpoint, itemId);

    const updates = {};

    updates[createDataItemEndpoint({endpoint, itemId})] = {
      ...currentItem,
      ...payload,
      updatedDate: new Date().toISOString(),
    };

    await update(ref(firebaseDataBase), updates);
  } catch (err) {
    console.warn(err);
    return Promise.reject(err);
  }
};

export const removeDataItemById = async <T>(endpoint: EndpointsList, itemId: string): Promise<void> => {
  try {
    // eslint-disable-next-line no-console
    console.log(11, `${createDataEndpoint({endpoint})}/${itemId}`);
    return await remove(child(ref(firebaseDataBase), `${createDataEndpoint({endpoint})}/${itemId}`));
  } catch (err) {
    console.warn(err);
    return Promise.reject(err);
  }
};

export const removeAllData = async <T>(endpoint: EndpointsList): Promise<void> => {
  try {
    return await set(ref(firebaseDataBase, createDataEndpoint({endpoint})), null);
  } catch (err) {
    console.warn(err);
    return Promise.reject(err);
  }
};
