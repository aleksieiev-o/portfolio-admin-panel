'use client';

import React, {FC, ReactElement, useState} from 'react';
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTrigger} from '@/components/ui/sheet';
import {Button} from '@/components/ui/button';
import {Menu} from 'lucide-react';
import HeaderLogo from '@/widgets/appHeader/_ui/HeaderLogo';
import HeaderNav from '@/widgets/appHeader/_ui/HeaderNav';
import {APP_DESCRIPTION} from '@/shared/appConstants';

const HeaderDrawer: FC = (): ReactElement => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant={'ghost'} size={'icon'} title={'Navigation menu'}>
          <Menu className={'h-[1.7rem] w-[1.7rem]'} />
        </Button>
      </SheetTrigger>

      <SheetContent side={'left'} className={'flex flex-col items-start justify-start'}>
        <SheetHeader className={'mb-6'}>
          <HeaderLogo appNameVisibilityClasses={''} withSheetClose={true} />

          <SheetDescription>{APP_DESCRIPTION}</SheetDescription>
        </SheetHeader>

        <HeaderNav withSheetClose={true} />
      </SheetContent>
    </Sheet>
  );
};

export default HeaderDrawer;
