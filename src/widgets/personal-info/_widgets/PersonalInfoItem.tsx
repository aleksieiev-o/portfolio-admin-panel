'use client';

import {Form} from '@/components/ui/form';
import {useToast} from '@/components/ui/use-toast';
import {updatePersonalInfo} from '@/entities/personalInfo/personalInfo.service';
import {useLoading} from '@/shared/hooks/useLoading';
import SubmitButton from '@/shared/ui/appButton/Submit.button';
import {IAppFormInput} from '@/shared/ui/appInput/_types/AppFormInput.interface';
import AppFormInputText from '@/shared/ui/appInput/AppFormInput.text';
import {zodResolver} from '@hookform/resolvers/zod';
import {IPersonalInfo} from 'my-portfolio-types';
import {FC, ReactElement, useId, useMemo} from 'react';
import {useForm} from 'react-hook-form';
import {z, ZodIssueCode} from 'zod';

interface Props extends Omit<IAppFormInput, 'formModel' | 'disabled' | 'required' | 'name'> {
  itemValue: string;
  fieldName: keyof IPersonalInfo;
}

const PersonalInfoItem: FC<Props> = (props): ReactElement => {
  const {mode, type, fieldName, label, placeholder, isDataPending, itemValue} = props;
  const formID = useId();
  const {toast} = useToast();
  const {isLoading, setIsLoading} = useLoading();

  const stringValidation = z
    .string({
      required_error: 'Field is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .min(3, 'Value length must be at least 3 characters')
    .max(20, 'Value length must not exceed 20 characters');

  const emailValidation = z
    .string({
      required_error: 'Field is required',
      invalid_type_error: 'Value must be a string',
    })
    .trim()
    .email('Invalid email address')
    .min(3, 'Value length must be at least 3 characters')
    .max(254, 'Value length must not exceed 254 characters');

  const personalInfoItemSchema = useMemo(
    () =>
      z
        .object({
          [fieldName]: type === 'email' ? emailValidation : stringValidation,
        })
        .superRefine((data, ctx) => {
          if (data[fieldName] === itemValue) {
            ctx.addIssue({
              code: ZodIssueCode.custom,
              path: [fieldName],
              message: 'The old and new value are the same',
            });
          }
        }),
    [emailValidation, fieldName, itemValue, stringValidation, type],
  );

  const formModel = useForm<z.infer<typeof personalInfoItemSchema>>({
    resolver: zodResolver(personalInfoItemSchema),
    defaultValues: {
      [fieldName]: itemValue,
    },
  });

  const handleSubmitForm = async (values: z.infer<typeof personalInfoItemSchema>) => {
    setIsLoading(true);

    try {
      await updatePersonalInfo({
        field: fieldName,
        value: values[fieldName],
      });

      toast({
        title: 'Success',
        description: 'Personal info changed successfully.',
      });
    } catch (e) {
      toast({
        title: 'Failure',
        description: 'An error has occurred. Something went wrong.',
        variant: 'destructive',
      });
      console.warn(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-row flex-nowrap items-end justify-start gap-4">
      <Form {...formModel}>
        <form onSubmit={formModel.handleSubmit(handleSubmitForm)} id={formID} className={'flex w-full flex-col items-start justify-center gap-4'}>
          <AppFormInputText
            mode={mode}
            type={type}
            formModel={formModel}
            name={fieldName}
            label={label}
            placeholder={placeholder}
            required={true}
            disabled={isLoading}
            isDataPending={isDataPending}
          />
        </form>
      </Form>

      <SubmitButton formId={formID} title={'Save changes'} btnBody={'Save'} isLoading={isLoading || isDataPending} disabled={isLoading || isDataPending} />
    </div>
  );
};

export default PersonalInfoItem;
