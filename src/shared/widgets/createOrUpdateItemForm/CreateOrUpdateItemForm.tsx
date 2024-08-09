'use client';

import {FC, ReactElement, useId, useMemo} from 'react';
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
import {createProject} from '@/entities/projects/projects.service';
import {usePathname} from 'next/navigation';
import AppSwitch from '@/shared/ui/appSwitch/AppSwitch';
import AppFormInputDate from '@/shared/ui/appInput/AppFormInput.date';

interface Props {
  mode: 'create' | 'update';
}

const CreateOrUpdateItemForm: FC<Props> = (props): ReactElement => {
  const {mode} = props;
  const formID = useId();
  const {toast} = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const projectId = useMemo(() => pathname, [pathname]);

  const schema = useMemo(
    () =>
      z.object({
        title: z
          .string({
            required_error: 'Field is required',
            invalid_type_error: 'Value must be a string',
          })
          .trim()
          .min(3, 'Value must be at least 3 characters')
          .max(25, 'Value must not exceed 25 characters'),
        visibility: z.boolean({
          required_error: 'Field is required',
        }),
        position: z
          .number({
            required_error: 'Field is required',
          })
          .int()
          .min(0),
        description: z
          .string({
            required_error: 'Field is required',
            invalid_type_error: 'Value must be a string',
          })
          .trim()
          .min(10, 'Value must be at least 10 characters')
          .max(280, 'Value must not exceed 280 characters'),
        mainTechnology: z
          .string({
            required_error: 'Field is required',
            invalid_type_error: 'Value must be a string',
          })
          .trim()
          .min(3, 'Value must be at least 3 characters')
          .max(25, 'Value must not exceed 25 characters'),
        releaseDate: z.date({
          required_error: 'Field is required',
        }),
        repository: z
          .string({
            required_error: 'Field is required',
            invalid_type_error: 'Value must be a string',
          })
          .trim()
          .url({
            message: 'Value must be an URL',
          }),
        demo: z
          .string({
            required_error: 'Field is required',
            invalid_type_error: 'Value must be a string',
          })
          .trim()
          .url({
            message: 'Value must be an URL',
          }),
        technologies: z.array(
          z
            .string({
              required_error: 'Field is required',
              invalid_type_error: 'Value must be a string',
            })
            .trim()
            .min(3, 'Value must be at least 3 characters')
            .max(25, 'Value must not exceed 25 characters'),
        ),
        preview: z.instanceof(File).refine((payload) => payload.size <= 3000000, {
          message: 'Image must not exceed 3MB',
        }),
        screensList: z.instanceof(File || FileList).refine(
          (payload) => {
            if (payload instanceof FileList) {
              const images = Array.from(payload).filter((item) => item.size <= 3000000);
              return images.length === payload.length; // TODO rework this check!
            }

            return payload.size <= 3000000;
          },
          {
            message: 'Image must not exceed 3MB',
          },
        ),
      }),
    [],
  );

  const formModel = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSuccessCallback = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: [RoutePath.PROJECTS],
    });

    toast({
      title: 'Success',
      description: 'Project was successfully uploaded.',
    });

    formModel.reset();
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
    // TODO add payload type!
    mutationFn: async (values: any) => await createProject(values),
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

  // title: string;
  // visibility: boolean;
  // position: number;
  // description: string;
  // mainTechnology: string;
  // releaseDate: string;
  // repository: string;
  // demo: string;
  // technologies: Array<string>;
  // preview: IFile;
  // screensList: TFileList;

  return (
    <div className="grid w-full grid-cols-1 gap-4 overflow-hidden pb-6 md:gap-6">
      <Form {...formModel}>
        <form onSubmit={formModel.handleSubmit(handleSubmitForm)} id={formID} className="flex w-full flex-col items-start justify-center gap-4 overflow-y-auto">
          <div className="grid w-full grid-cols-2 gap-4 overflow-y-auto py-1 md:gap-6">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              <AppFormInputText
                mode={'input'}
                type={'text'}
                formModel={formModel}
                name={'title'}
                label={'Title'}
                placeholder={'Project title...'}
                required={true}
                disabled={isLoading}
                isDataPending={false}
              />

              <AppSwitch formModel={formModel} name={'visibility'} label={'Project visibility'} placeholder={'Change project visibility'} required={true} disabled={isLoading} />

              <AppFormInputText
                mode={'input'}
                type={'number'}
                formModel={formModel}
                name={'position'}
                label={'Project position'}
                placeholder={'Project position...'}
                required={true}
                disabled={isLoading}
                isDataPending={false}
              />

              <AppFormInputText
                mode={'textarea'}
                type={'text'}
                formModel={formModel}
                name={'description'}
                label={'Project description'}
                placeholder={'Project description...'}
                required={true}
                disabled={isLoading}
                isDataPending={false}
              />

              <AppFormInputText
                mode={'input'}
                type={'text'}
                formModel={formModel}
                name={'mainTechnology'}
                label={'Main technology'}
                placeholder={'Main technology...'}
                required={true}
                disabled={isLoading}
                isDataPending={false}
              />

              <AppFormInputDate
                formModel={formModel}
                name={'releaseDate'}
                label={'Project release date'}
                placeholder={'Project release date...'}
                required={true}
                disabled={isLoading}
                isDataPending={false}
              />

              <AppFormInputText
                mode={'input'}
                type={'text'}
                formModel={formModel}
                name={'repository'}
                label={'Project repository'}
                placeholder={'Project repository...'}
                required={true}
                disabled={isLoading}
                isDataPending={false}
              />

              <AppFormInputText
                mode={'input'}
                type={'text'}
                formModel={formModel}
                name={'demo'}
                label={'Project demo'}
                placeholder={'Project demo...'}
                required={true}
                disabled={isLoading}
                isDataPending={false}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:gap-6">IMAGE FORM ITEMS</div>
          </div>
        </form>
      </Form>

      <div>
        <SubmitButton formId={formID} title="Submit" btnBody="Submit" isLoading={isLoading} disabled={false} />
      </div>
    </div>
  );
};

export default CreateOrUpdateItemForm;
