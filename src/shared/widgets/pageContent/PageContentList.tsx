import ContentLoader from '@/shared/ui/ContentLoader';
import {FC, ReactElement, PropsWithChildren} from 'react';
import EmptyListNotification from '../EmptyListNotification';

interface Props extends PropsWithChildren {
  pending: boolean;
  isEmptyList: boolean;
  emptyListNotification: string;
}

const PageContentList: FC<Props> = (props): ReactElement => {
  const {children, pending, isEmptyList, emptyListNotification} = props;

  return (
    <>
      {pending ? (
        <ContentLoader />
      ) : (
        <>
          {isEmptyList ? (
            <EmptyListNotification notification={emptyListNotification} />
          ) : (
            <div className="grid w-full grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2 md:gap-6 xl:grid-cols-3">{children}</div>
          )}
        </>
      )}
    </>
  );
};

export default PageContentList;
