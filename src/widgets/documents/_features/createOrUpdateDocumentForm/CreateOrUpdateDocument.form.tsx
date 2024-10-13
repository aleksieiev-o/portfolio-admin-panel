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
import {createDocument, updateDocument} from '@/entities/documents/documents.service';
import {useRouter, useSearchParams} from 'next/navigation';
import AppSwitch from '@/shared/ui/appSwitch/AppSwitch';
import {ICreateDocumentDto} from '@/shared/types/documents.types';
import {IDocument} from 'my-portfolio-types';
import {createDocumentFormValidation} from './_validations/CreateForm.validation';
import {updateDocumentFormValidation} from './_validations/UpdateForm.validation';
import AppFormSelect from '@/shared/ui/appSelect/AppFormSelect';

interface Props {
  mode: 'create' | 'update';
  data: IDocument | undefined;
  isPending: boolean;
  isSuccess: boolean;
}

const CreateOrUpdateDocumentForm: FC<Props> = (props): ReactElement => {
  const {mode, data, isPending, isSuccess} = props;
  const formID = useId();
  const {toast} = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const documentID = searchParams.get('id') || '';

  const schema = useMemo(() => z.object(mode === 'create' ? createDocumentFormValidation : updateDocumentFormValidation), [mode]);

  const formModel = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (mode === 'update' && data) {
      formModel.reset({
        title: data.title,
        visibility: data.visibility,
        position: data.position,
        lang: data.lang,
      });
    }
  }, [data, formModel, mode]);

  const onSuccessCallback = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: [RoutePath.DOCUMENTS],
    });

    toast({
      title: 'Success',
      description: 'Document was successfully uploaded.',
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
    mutationFn: async (values: ICreateDocumentDto) => (mode === 'create' ? await createDocument(values) : await updateDocument({...values, id: documentID})),
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

  const documentLanguageList = [
    {value: 'en-us', title: 'English'},
    {value: 'de-de', title: 'German'},
    {value: 'ru-ru', title: 'Russian'},
  ];

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
                placeholder={'Document title...'}
                required={true}
                disabled={isLoading}
                isDataPending={false}
              />

              <AppFormInputText
                mode={'input'}
                type={'number'}
                formModel={formModel}
                name={'position'}
                label={'Document position'}
                placeholder={'Document position...'}
                required={true}
                disabled={isLoading}
                isDataPending={false}
              />

              <AppSwitch formModel={formModel} name={'visibility'} label={'Document visibility'} placeholder={'Change document visibility'} required={true} disabled={isLoading} />

              <AppFormSelect
                id={'select-document-language'}
                dataList={documentLanguageList}
                emptyDataListMessage={'Language list is empty'}
                disabled={isLoading}
                name={'lang'}
                required={true}
                label={'Document language'}
                placeholder={'Select document language'}
                formModel={formModel}
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

export default CreateOrUpdateDocumentForm;
