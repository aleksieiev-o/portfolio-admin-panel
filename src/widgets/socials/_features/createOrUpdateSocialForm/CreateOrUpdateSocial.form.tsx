'use client';

import {FC, ReactElement, useEffect, useId, useMemo} from 'react';
import AppFormInputText from '@/shared/ui/appInput/AppFormInput.text';
import {Form} from '@/components/ui/form';
import SubmitButton from '@/shared/ui/appButton/Submit.button';
import {useToast} from '@/components/ui/use-toast';
import {useLoading} from '@/shared/hooks/useLoading';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import {RoutePath} from '@/shared/router/Routes.enum';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {createSocial, updateSocial} from '@/entities/socials/socials.service';
import {useRouter, useSearchParams} from 'next/navigation';
import AppSwitch from '@/shared/ui/appSwitch/AppSwitch';
import {ICreateSocialDto} from '@/shared/types/socials.types';
import {ISocial} from 'my-portfolio-types';
import {createSocialFormValidation} from './_validations/CreateForm.validation';
import {updateSocialFormValidation} from './_validations/UpdateForm.validation';

interface Props {
  mode: 'create' | 'update';
  data: ISocial | undefined;
  isPending: boolean;
  isSuccess: boolean;
}

const CreateOrUpdateSocialForm: FC<Props> = (props): ReactElement => {
  const {mode, data, isPending, isSuccess} = props;
  const formID = useId();
  const {toast} = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const socialID = searchParams.get('id') || '';

  const schema = useMemo(() => z.object(mode === 'create' ? createSocialFormValidation : updateSocialFormValidation), [mode]);

  const formModel = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (mode === 'update' && data) {
      formModel.reset({
        title: data.title,
        visibility: data.visibility,
        position: data.position,
        url: data.url,
        iconName: data.iconName,
      });
    }
  }, [data, formModel, mode]);

  const onSuccessCallback = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: [RoutePath.SOCIALS],
    });

    toast({
      title: 'Success',
      description: 'Social was successfully uploaded.',
    });

    formModel.reset();
    router.back();
  };

  const onErrorCallback = async (): Promise<void> => {
    toast({
      title: 'Failure',
      description: 'An error has occurred. Something went wrong.',
      variant: 'destructive',
    });
  };

  const onSettledCallback = async (): Promise<void> => {
    setIsLoading(false);
  };

  const mutationCreate = useMutation({
    mutationFn: async (values: ICreateSocialDto) => (mode === 'create' ? await createSocial(values) : await updateSocial({...values, id: socialID})),
    onSuccess: async (data, variables, context) => {
      await onSuccessCallback();
    },
    onError: async (error, variables) => {
      await onErrorCallback();
      console.warn(error, variables);
    },
    onSettled: async (data, error, variables, context) => {
      await onSettledCallback();
    },
  });

  const handleSubmitForm = async (values: z.infer<typeof schema>) => {
    setIsLoading(true);
    mutationCreate.mutate(values);
  };

  return (
    <div className="grid w-full grid-cols-1 gap-4 pb-6 md:gap-6">
      <Form {...formModel}>
        <form onSubmit={formModel.handleSubmit(handleSubmitForm)} id={formID} className="flex w-full flex-col items-start justify-center gap-4">
          <div className="grid w-full grid-cols-2 gap-4 py-1 md:gap-6">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              <AppFormInputText
                mode={'input'}
                type={'text'}
                formModel={formModel}
                name={'title'}
                label={'Title'}
                placeholder={'Social title...'}
                required={true}
                disabled={isLoading}
                isDataPending={false}
              />

              <AppFormInputText
                mode={'input'}
                type={'number'}
                formModel={formModel}
                name={'position'}
                label={'Social position'}
                placeholder={'Social position...'}
                required={true}
                disabled={isLoading}
                isDataPending={false}
              />

              <AppSwitch formModel={formModel} name={'visibility'} label={'Social visibility'} placeholder={'Change social visibility'} required={true} disabled={isLoading} />

              <AppFormInputText
                mode={'input'}
                type={'text'}
                formModel={formModel}
                name={'url'}
                label={'URL'}
                placeholder={'URL...'}
                required={true}
                disabled={isLoading}
                isDataPending={false}
              />

              <AppFormInputText
                mode={'input'}
                type={'text'}
                formModel={formModel}
                name={'iconName'}
                label={'Icon name'}
                placeholder={'Icon name...'}
                required={true}
                disabled={isLoading}
                isDataPending={false}
              />
            </div>
          </div>
        </form>
      </Form>

      <div className="flex flex-row items-center justify-start">
        <SubmitButton formId={formID} title="Submit" btnBody="Submit" isLoading={isLoading} disabled={false} />
      </div>
    </div>
  );
};

export default CreateOrUpdateSocialForm;
