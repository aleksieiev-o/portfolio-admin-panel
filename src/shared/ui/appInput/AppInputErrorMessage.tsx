import {cn} from '@/lib/utils';
import {FC, ReactElement} from 'react';

interface Props {
  errorMessage: string;
}

const AppInputErrorMessage: FC<Props> = (props): ReactElement => {
  const {errorMessage} = props;

  return <>{errorMessage && <p className={cn('text-sm font-medium text-destructive')}>{errorMessage}</p>}</>;
};

export default AppInputErrorMessage;
