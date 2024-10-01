import {RouteName} from '@/shared/router/Routes.enum';
import {FC, ReactElement} from 'react';
import PageTitle from '../PageTitle';

interface Props {
  pageTitle: RouteName;
}

const PageContentHeader: FC<Props> = (props): ReactElement => {
  const {pageTitle} = props;

  return (
    <div className="flex w-full flex-row flex-nowrap items-center justify-between gap-4 md:gap-6">
      <PageTitle title={pageTitle} />
    </div>
  );
};

export default PageContentHeader;
