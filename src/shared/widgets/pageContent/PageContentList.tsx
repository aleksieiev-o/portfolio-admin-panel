import ContentLoader from '@/shared/ui/ContentLoader';
import {FC, ReactElement, PropsWithChildren} from 'react';

interface Props extends PropsWithChildren {
  pending: boolean;
}

const PageContentList: FC<Props> = (props): ReactElement => {
  const {children, pending} = props;

  return <>{pending ? <ContentLoader /> : <div className="grid w-full grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2 md:gap-6 xl:grid-cols-3">{children}</div>}</>;
};

export default PageContentList;
