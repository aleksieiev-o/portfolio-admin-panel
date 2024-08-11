import {FormField, FormItem, FormLabel, FormDescription, FormControl} from '@/components/ui/form';
import {Switch} from '@/components/ui/switch';
import {FC, ReactElement} from 'react';

/* tslint:disable */
interface Props {
  formModel: any; // TODO fix type
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
  disabled: boolean;
}
/* tslint:enable */

const AppSwitch: FC<Props> = (props): ReactElement => {
  const {formModel, name, label, placeholder, required, disabled} = props;

  return (
    <div className="flex flex-row flex-nowrap items-center justify-start gap-2">
      <FormField
        control={formModel.control}
        name={name}
        disabled={disabled}
        render={({field}) => (
          <FormItem className="flex w-full flex-row items-start justify-start gap-4 rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base" title={placeholder} aria-required={required}>
                {label}
              </FormLabel>

              <FormDescription>{placeholder}</FormDescription>
            </div>

            <FormControl aria-required={required}>
              <Switch checked={field.value} onCheckedChange={field.onChange} disabled={disabled} defaultChecked={true} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default AppSwitch;
