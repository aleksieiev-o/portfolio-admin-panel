import {RouteName, RoutePath} from '@/shared/router/Routes.enum';
import {FC, ReactElement} from 'react';
import PageTitle from '../PageTitle';
import PageActions from './_widgets/PageActions';

interface Props {
  pageTitle: RouteName;
  createTitle: string;
  createLink: RoutePath;
  removeTitle: string;
}

const PageContentHeader: FC<Props> = (props): ReactElement => {
  const {pageTitle, createTitle, createLink, removeTitle} = props;

  return (
    <div className="flex w-full flex-row flex-nowrap items-center justify-between gap-4 md:gap-6">
      <PageTitle title={pageTitle} />

      <PageActions createButtonTitle={createTitle} createButtonLink={createLink} removeButtonTitle={removeTitle} />
    </div>
  );
};

export default PageContentHeader;
