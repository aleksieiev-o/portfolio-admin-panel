import ContentLoader from '@/shared/ui/ContentLoader';
import {FC, ReactElement, PropsWithChildren} from 'react';

interface Props extends PropsWithChildren {
  pending: boolean;
}

const PageContentList: FC<Props> = (props): ReactElement => {
  const {children, pending} = props;

  return <div className="flex h-full w-full flex-col items-start justify-start gap-4 overflow-y-auto md:gap-6">{pending ? <ContentLoader /> : <>{children}</>}</div>;
};

export default PageContentList;
