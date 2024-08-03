import {RouteName} from '@/shared/router/Routes.enum';
import {FC, ReactElement} from 'react';
import PageTitle from '../PageTitle';
import PageActions from './_widgets/PageActions';

interface Props {
  pageTitle: RouteName;
  createTitle: string;
  removeTitle: string;
}

const PageContentHeader: FC<Props> = (props): ReactElement => {
  const {pageTitle, createTitle, removeTitle} = props;

  return (
    <div className="flex w-full flex-row flex-nowrap items-center justify-between gap-4 md:gap-6">
      <PageTitle title={pageTitle} />

      <PageActions createButtonTitle={createTitle} removeButtonTitle={removeTitle} />
    </div>
  );
};

export default PageContentHeader;
