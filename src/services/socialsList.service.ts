import {ISocial} from 'my-portfolio-types';
import {EndpointsList} from '@/shared/Endpoints.enum';
import {fetchDataList} from '@/services/data.service';
import {push, ref, set} from '@firebase/database';
import {firebaseDataBase} from '@/lib/firebase/firebase';
import {TypeCreateSocialDto} from '@/shared/dto/createSocial.dto';

export const fetchSocialsList = async (): Promise<Array<ISocial>> => {
  return await fetchDataList(EndpointsList.SOCIALS);
};

export const createSocial = async (
  payload: TypeCreateSocialDto,
): Promise<void> => {
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
