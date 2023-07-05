import { ISocial } from 'my-portfolio-types';
import { EndpointsList } from '@/shared/Endpoints.enum';
import { fetchDataList } from '@/services/dataList.service';
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
