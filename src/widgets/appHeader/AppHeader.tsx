import React, {FC, ReactElement} from 'react';
import HeaderDrawer from '@/widgets/appHeader/_ui/HeaderDrawer';
import HeaderLogo from '@/widgets/appHeader/_ui/HeaderLogo';
import AppHeaderInfo from '@/widgets/appHeader/AppHeaderInfo';
import AuthStateChangeButton from '@/widgets/appHeader/_ui/AuthStateChange.button';
import ThemeChangeButton from '@/features/theme/ThemeChange.button';
import {APP_NAME} from '@/shared/appConstants';

interface Props {
  variant: 'auth' | 'private' | 'public';
}

const AppHeader: FC<Props> = (props): ReactElement => {
  const {variant} = props;

  return (
    <header className={'flex h-20 w-full flex-row items-center justify-between ' + 'gap-4 overflow-hidden border-b px-2 shadow-md md:px-4 lg:gap-6'}>
      {variant !== 'auth' && (
        <div className="flex flex-row flex-nowrap items-end justify-start gap-2">
          <HeaderDrawer />

          <strong className={`hidden whitespace-nowrap font-bold leading-5 text-primary sm:inline`}>{APP_NAME}</strong>
        </div>
      )}

      {variant === 'auth' && (
        <div className={'flex h-full items-center'}>
          <HeaderLogo withSheetClose={false} />
        </div>
      )}

      <div className={'grid h-20 auto-cols-max grid-flow-col items-center gap-4 lg:gap-6'}>
        {variant !== 'auth' && (
          <>
            <AppHeaderInfo />

            <AuthStateChangeButton />
          </>
        )}

        {/*<LocaleChangeButton/>*/}

        <ThemeChangeButton />
      </div>
    </header>
  );
};

export default AppHeader;
