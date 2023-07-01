import { ISocial } from 'my-portfolio-types';
import { EndpointsList } from '@/shared/Endpoints.enum';
import { fetchDataList } from '@/services/fetchDataList.service';
import { child, push, ref, remove, set, update } from '@firebase/database';
import { firebaseDataBase } from '@/firebase';
import { TypeCreateSocialDto } from '@/shared/dto/createSocial.dto';

export const fetchSocialsList = async (): Promise<Array<ISocial>> => {
  return await fetchDataList(EndpointsList.SOCIALS);
};

export const createSocial = async (payload: TypeCreateSocialDto): Promise<void> => {
  const {title, visibility, url} = payload;
  const socialRef = push(ref(firebaseDataBase, EndpointsList.SOCIALS));

  const social: ISocial = {
    id: socialRef.key!,
    title,
    visibility,
    url,
  };

  return await set(socialRef, social);
};

export const updateSocial = async (payload: ISocial, id: string): Promise<void> => {
  return await update(child(ref(firebaseDataBase), `${EndpointsList.SOCIALS}/${id}`), payload);
};

export const removeSocial = async (id: string): Promise<void> => {
  return await remove(child(ref(firebaseDataBase), `${EndpointsList.SOCIALS}/${id}`));
};

export const removeAllSocials = async (): Promise<void> => {
  return await set(ref(firebaseDataBase, EndpointsList.SOCIALS), null);
};
