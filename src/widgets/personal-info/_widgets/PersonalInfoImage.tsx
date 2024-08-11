'use client';

import {Skeleton} from '@/components/ui/skeleton';
import {fetchMainImage} from '@/entities/files.service';
import {AppAuthContext} from '@/shared/providers/AppAuth.provider';
import {RoutePath} from '@/shared/router/Routes.enum';
import EmptyListNotification from '@/shared/widgets/EmptyListNotification';
import {useQuery} from '@tanstack/react-query';
import {FC, ReactElement, useContext} from 'react';
import Image from 'next/image';
import UploadImageDialog from '@/shared/widgets/uploadImage/UploadImage.dialog';

const mainImageSizes = {
  width: 300,
  height: 300,
};

const PersonalInfoImage: FC = (): ReactElement => {
  const {user} = useContext(AppAuthContext);

  const {
    data: mainImageQueryData,
    isPending: mainImageIsPending,
    isSuccess: mainImageIsSuccess,
  } = useQuery({
    queryKey: [RoutePath.MAIN_IMAGE],
    queryFn: async () => await fetchMainImage(),
    staleTime: 5 * 1000,
    enabled: !!user,
  });

  return (
    <div className="flex flex-col items-start justify-start gap-4 md:gap-6">
      <div className="flex w-full items-center justify-center px-4 md:px-6">
        {mainImageIsPending ? (
          <Skeleton className={`h-[${mainImageSizes.width}px] w-[${mainImageSizes.height}0px]`} />
        ) : (
          <>
            {mainImageIsSuccess && mainImageQueryData ? (
              <Image src={mainImageQueryData.fileSrc} alt={mainImageQueryData.fileName} width={mainImageSizes.width} height={mainImageSizes.height} priority={true} />
            ) : (
              <EmptyListNotification notification="Main image is not enabled" />
            )}
          </>
        )}
      </div>

      <div className="flex w-full items-center justify-center">
        <UploadImageDialog currentImage={mainImageIsSuccess ? mainImageQueryData : null} />
      </div>
    </div>
  );
};

export default PersonalInfoImage;
