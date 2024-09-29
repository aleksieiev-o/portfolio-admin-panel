'use client';

import {RouteName, RoutePath} from '@/shared/router/Routes.enum';
import {FC, ReactElement, useState} from 'react';
import PageTitle from '../PageTitle';
import PageActions from './_widgets/PageActions';
import RemoveAllConfirmDialog from './_widgets/RemoveAllConfirm.dialog';

interface Props {
  pageTitle: RouteName;
  createTitle: string;
  createLink: RoutePath;
  removeTitle: string;
  dialogTitle: string;
  dialogDescription: string;
  dialogQuestion: string;
  btnTitle: string;
  toastDescription: string;
  handleRemoveAll: () => Promise<void>;
  queryKey: RoutePath;
}

const PageContentHeader: FC<Props> = (props): ReactElement => {
  const {pageTitle, createTitle, createLink, removeTitle, dialogTitle, dialogDescription, dialogQuestion, btnTitle, toastDescription, handleRemoveAll, queryKey} = props;
  const [dialogRemoveAllIsOpen, setDialogRemoveAllIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex w-full flex-row flex-nowrap items-center justify-between gap-4 md:gap-6">
        <PageTitle title={pageTitle} />

        <PageActions createButtonTitle={createTitle} createButtonLink={createLink} removeButtonTitle={removeTitle} setDialogIsOpen={setDialogRemoveAllIsOpen} />
      </div>

      <RemoveAllConfirmDialog
        dialogIsOpen={dialogRemoveAllIsOpen}
        setDialogIsOpen={setDialogRemoveAllIsOpen}
        dialogTitle={dialogTitle}
        dialogDescription={dialogDescription}
        dialogQuestion={dialogQuestion}
        btnTitle={btnTitle}
        toastDescription={toastDescription}
        handleRemoveAll={handleRemoveAll}
        queryKey={queryKey}
      />
    </>
  );
};

export default PageContentHeader;
