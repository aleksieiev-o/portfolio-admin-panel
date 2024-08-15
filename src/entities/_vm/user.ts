import {EndpointsImagesList, EndpointsList} from '@/shared/Endpoints.enum';
import {firebaseAuth} from '@/lib/firebase/firebase';

interface IPayload {
  endpoint: EndpointsList | EndpointsImagesList;
  userUID?: string;
  itemId: string;
}

type TCreateEndpoint = Omit<IPayload, 'itemId'>;
type TCreateItemDataEndpoint = IPayload;

export const createDataEndpoint = (payload: TCreateEndpoint): string => {
  // TODO FIX: change chaining operator with default value for uid
  const {endpoint, userUID = firebaseAuth.currentUser?.uid || ''} = payload;

  try {
    return `${endpoint}`.replace('_userUID_', userUID);
  } catch (err) {
    throw new Error(`An error occurred. User is not defined.\n${err}`);
  }
};

export const createDataItemEndpoint = (payload: TCreateItemDataEndpoint): string => {
  // TODO FIX: change chaining operator with default value for uid
  const {endpoint, userUID = firebaseAuth.currentUser?.uid || '', itemId} = payload;

  try {
    return `${endpoint}`.replace('_userUID_', userUID).replace('[id]', itemId);
  } catch (err) {
    throw new Error(`An error occurred. User is not defined.\n${err}`);
  }
};
