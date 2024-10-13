import {FormField, FormItem, FormLabel, FormControl} from '@/components/ui/form';
import {Select} from '@/components/ui/select';
import {FC} from 'react';
import AppSelectTrigger from './_ui/AppSelect.trigger';
import AppSelectContent from './_ui/AppSelect.content';
import {IAppFormInput} from '../appInput/_types/AppFormInput.interface';
import {Asterisk} from 'lucide-react';
import {Skeleton} from '@/components/ui/skeleton';

interface Props extends Omit<IAppFormInput, 'type' | 'mode'> {
  id: string;
  dataList: Array<{value: string; title: string}>;
  emptyDataListMessage: string;
}

const AppFormSelect: FC<Props> = (props) => {
  const {formModel, id, name, label, placeholder, dataList, emptyDataListMessage, required, disabled, isDataPending} = props;

  return (
    <FormField
      control={formModel.control}
      name={name}
      render={({field}) => (
        <FormItem className={'w-full'}>
          <FormLabel htmlFor={id} aria-required={required} className={'flex'}>
            <span className={'mr-0.5'}>{label}</span>

            {required && <Asterisk className={'h-2.5 w-2.5 self-start stroke-destructive'} />}
          </FormLabel>

          {isDataPending ? (
            <Skeleton className={'h-12 w-full'} />
          ) : (
            <Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
              <FormControl aria-required={required}>
                <AppSelectTrigger id={id} placeholder={placeholder} disabled={disabled} isDataPending={isDataPending} width={'full'} />
              </FormControl>

              <AppSelectContent dataList={dataList} emptyDataListMessage={emptyDataListMessage} />
            </Select>
          )}
        </FormItem>
      )}
    ></FormField>
  );
};

export default AppFormSelect;
