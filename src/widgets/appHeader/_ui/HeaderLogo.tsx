import React, {FC, ReactElement} from 'react';
import {RoutePath} from '@/shared/router/Routes.enum';
import {APP_NAME} from '@/shared/appConstants';
import {BriefcaseBusiness} from 'lucide-react';
import Link from 'next/link';
import {SheetClose} from '@/components/ui/sheet';

interface Props {
  withSheetClose: boolean;
}

const HeaderLogo: FC<Props> = (props): ReactElement => {
  const {withSheetClose} = props;
  const [SheetCloseWrapper, sheetCloseWrapperProps] = withSheetClose ? [SheetClose, {asChild: true}] : [React.Fragment, {}];

  return (
    <SheetCloseWrapper {...sheetCloseWrapperProps}>
      <Link href={RoutePath.HOME}>
        <div className={'flex flex-row items-end gap-2 overflow-hidden'} title={APP_NAME}>
          <BriefcaseBusiness className={'h-10 w-10 stroke-primary'} />

          <strong className={`whitespace-nowrap font-bold leading-5 text-primary`}>{APP_NAME}</strong>
        </div>
      </Link>
    </SheetCloseWrapper>
  );
};

export default HeaderLogo;
