import {FC, ReactElement} from 'react';
import {Label} from '@/components/ui/label';
import {Skeleton} from '@/components/ui/skeleton';
import {Textarea} from '@/components/ui/textarea';
import {Asterisk} from 'lucide-react';
import {Input} from '@/components/ui/input';
import AppInputErrorMessage from './AppInputErrorMessage';
import {cn} from '@/lib/utils';
import {IAppFormInput} from './_types/AppFormInput.interface';

interface Props extends IAppFormInput {
  value: string;
  handleOnChange: (value: string) => void;
  errorMessage: string;
}

const AppInputText: FC<Props> = (props): ReactElement => {
  const {mode, label, placeholder, required, disabled, type, isDataPending, value, handleOnChange, errorMessage} = props;

  return (
    <div className="flex w-full flex-col items-start justify-start gap-2">
      <Label className={cn('flex', errorMessage ? 'text-destructive' : '')}>
        <span className={'mr-0.5'}>{label}</span>

        <Asterisk className={'h-2.5 w-2.5 self-start stroke-destructive'} />
      </Label>
      {mode === 'input' ? (
        <>
          {isDataPending ? (
            <Skeleton className={'h-12 w-full'} />
          ) : (
            <Input
              onChange={(e) => handleOnChange(e.target.value)}
              value={value}
              placeholder={placeholder}
              aria-required={required}
              type={type}
              disabled={disabled}
              className="w-full"
            />
          )}
        </>
      ) : (
        <>
          {isDataPending ? (
            <Skeleton className={'min-h-[80px] w-full'} />
          ) : (
            <Textarea
              onChange={(e) => handleOnChange(e.target.value)}
              value={value}
              placeholder={placeholder}
              aria-required={required}
              disabled={disabled}
              className="min-h-[80px] w-full"
            />
          )}
        </>
      )}

      <AppInputErrorMessage errorMessage={errorMessage} />
    </div>
  );
};

export default AppInputText;
