import {ISocial} from 'my-portfolio-types';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {push, ref, set} from '@firebase/database';
import {firebaseDataBase} from '@/lib/firebase/firebase';
import {ICreateSocialDto} from '@/shared/types/socials.types';
import {fetchAllData} from '../_db.service';

export const fetchAllSocials = async (userUID?: string): Promise<Array<ISocial>> => {
  return await fetchAllData<ISocial>(EndpointsList.SOCIALS, userUID);
};

export const createSocial = async (payload: ICreateSocialDto): Promise<void> => {
  const {title, visibility, url, iconName, position} = payload;
  const socialRef = push(ref(firebaseDataBase, EndpointsList.SOCIALS));

  const social: ISocial = {
    id: socialRef.key!,
    title,
    visibility,
    url,
    iconName,
    position: position,
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
  };

  return await set(socialRef, social);
};
