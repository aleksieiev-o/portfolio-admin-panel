'use client';

import {FC, ReactElement} from 'react';
import GoToPreviousPageButton from '@/shared/ui/appButton/GoToPreviousPage.button';
import GoHomeButton from '@/shared/ui/appButton/GoHome.button';

const ScreenNotAvailable: FC = (): ReactElement => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-4 md:gap-6">
      <div className="flex w-full items-center justify-start">
        <GoToPreviousPageButton />
      </div>

      <div className="flex h-full w-full flex-col items-center justify-center gap-4 md:gap-6">
        <span className="text-center">Screen is not available</span>

        <GoHomeButton />
      </div>
    </div>
  );
};

export default ScreenNotAvailable;
