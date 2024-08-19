import {IFile} from 'my-portfolio-types';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {child, ref} from '@firebase/database';
import {firebaseDataBase} from '@/lib/firebase/firebase';
import {get} from 'firebase/database';
import {createDataEndpoint} from '../_vm/user';

export const fetchMainImage = async (userUID?: string): Promise<IFile | null> => {
  // TODO refactor this method!
  try {
    const snapshot = await get(child(ref(firebaseDataBase), createDataEndpoint({endpoint: EndpointsList.MAIN_IMAGE, userUID})));
    const result = snapshot.val() || null;
    return Promise.resolve<IFile | null>(result);
  } catch (err) {
    console.warn(err);
    return Promise.reject<null>(null);
  }
};
