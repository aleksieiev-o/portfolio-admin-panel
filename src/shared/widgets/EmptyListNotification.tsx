import {FC, ReactElement} from 'react';

interface Props {
  notification: string;
}

const EmptyListNotification: FC<Props> = (props): ReactElement => {
  const {notification} = props;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <span>{notification}</span>
    </div>
  );
};

export default EmptyListNotification;
