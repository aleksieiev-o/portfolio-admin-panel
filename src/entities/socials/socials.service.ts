import {ISocial} from 'my-portfolio-types';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {push, ref, set} from '@firebase/database';
import {firebaseDataBase} from '@/lib/firebase/firebase';
import {ICreateSocialDto, IUpdateSocialDto} from '@/shared/types/socials.types';
import {fetchAllData, fetchDataItemById, removeAllData, removeDataItemById, updateDataItemById} from '../_db.service';
import {createDataEndpoint} from '../_vm/user';

export const fetchAllSocials = async (userUID?: string): Promise<Array<ISocial>> => {
  return await fetchAllData<ISocial>(EndpointsList.SOCIALS, userUID);
};

export const fetchSocialByID = async (socialID: string, userID?: string): Promise<ISocial> => {
  return await fetchDataItemById<ISocial>(EndpointsList.SOCIAL_BY_ID, socialID, userID);
};

export const createSocial = async (payload: ICreateSocialDto): Promise<void> => {
  const {title, visibility, url, iconName, position} = payload;
  const socialRef = push(ref(firebaseDataBase, `${createDataEndpoint({endpoint: EndpointsList.SOCIALS})}`));
  const socialID = socialRef.key!;

  const social: ISocial = {
    id: socialID,
    title,
    visibility,
    url,
    iconName,
    position,
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
  };

  return await set(socialRef, social);
};

export const updateSocial = async (payload: IUpdateSocialDto): Promise<void> => {
  return await updateDataItemById(EndpointsList.SOCIAL_BY_ID, payload.id, payload);
};

export const removeSocialById = async (id: string): Promise<void> => {
  return await removeDataItemById(EndpointsList.SOCIALS, id);
};

export const removeAllSocials = async (): Promise<void> => {
  return await removeAllData(EndpointsList.SOCIALS);
};
