import { Endpoints } from '@/shared/Endpoints.enum';
import { child, DataSnapshot, get, ref } from '@firebase/database';
import { firebaseDataBase } from '@/firebase';

export const fetchData = async<T> (path: Endpoints): Promise<T> => {
  const snapshot: DataSnapshot = await get(child(ref(firebaseDataBase), path));

  return snapshot.val() || {};
};
