import {FC, ReactElement} from 'react';
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Asterisk} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {IAppFormInput} from '@/shared/ui/appInput/_types/AppFormInput.interface';

interface Props extends Omit<IAppFormInput, 'type' | 'placeholder' | 'mode'> {
  multiple: boolean;
  accept: string;
}

const AppFormInputFile: FC<Props> = (props): ReactElement => {
  const {formModel, name, label, required, disabled, isDataPending, multiple, accept} = props;

  return (
    <FormField
      control={formModel.control}
      name={name}
      render={({field: {value, onChange, ...fieldProps}}) => (
        <FormItem>
          <FormLabel aria-required={required} className={'flex'}>
            <span className={'mr-0.5'}>{label}</span>
            <Asterisk className={'h-2.5 w-2.5 self-start stroke-destructive'} />
          </FormLabel>

          <FormControl aria-required={required}>
            <Input
              {...fieldProps}
              type="file"
              accept={accept}
              aria-required={required}
              multiple={multiple}
              onChange={(event) => onChange(event.target.files && event.target.files[0])}
              disabled={disabled}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AppFormInputFile;
