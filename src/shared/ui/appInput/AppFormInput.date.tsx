import {FC, ReactElement} from 'react';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Asterisk} from 'lucide-react';
import {IAppFormInput} from '@/shared/ui/appInput/_types/AppFormInput.interface';
import {Skeleton} from '@/components/ui/skeleton';
import {format} from 'date-fns';
import {Calendar as CalendarIcon} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

type Props = Omit<IAppFormInput, 'mode' | 'type'>;

const AppFormInputDate: FC<Props> = (props): ReactElement => {
  const {formModel, name, label, placeholder, required, disabled, isDataPending} = props;

  return (
    <FormField
      control={formModel.control}
      name={name as string}
      render={({field}) => (
        <FormItem className={'w-full'}>
          <FormLabel aria-required={required} className={'flex'}>
            <span className={'mr-0.5'}>{label}</span>

            <Asterisk className={'h-2.5 w-2.5 self-start stroke-destructive'} />
          </FormLabel>

          <FormControl aria-required={required}>
            {isDataPending ? (
              <Skeleton className={'h-12 w-full'} />
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={'outline'} disabled={disabled} className={cn('w-full justify-start text-left font-normal', !field.value && 'text-muted-foreground')}>
                    <CalendarIcon className="mr-2 h-4 w-4" />

                    {field.value ? format(field.value, 'PP') : <span>{placeholder}</span>}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                </PopoverContent>
              </Popover>
            )}
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AppFormInputDate;
