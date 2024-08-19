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
import {createProject, updateProject} from '@/entities/projects/projects.service';
import {useRouter, useSearchParams} from 'next/navigation';
import AppSwitch from '@/shared/ui/appSwitch/AppSwitch';
import AppFormInputDate from '@/shared/ui/appInput/AppFormInput.date';
import ProjectTechnologiesListForm from './_widgets/ProjectTechnologiesList.form';
import AppFormInputFile from '@/shared/ui/appInput/AppFormInput.file';
import {ICreateProjectDto} from '@/shared/types/projects.types';
import {IProject} from 'my-portfolio-types';

interface Props {
  mode: 'create' | 'update';
  data: IProject | undefined;
  isPending: boolean;
  isSuccess: boolean;
}

const CreateOrUpdateProjectForm: FC<Props> = (props): ReactElement => {
  const {mode, data, isPending, isSuccess} = props;
  const formID = useId();
  const {toast} = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const projectID = searchParams.get('id') || '';

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
        visibility: z
          .boolean({
            required_error: 'Field is required',
          })
          .default(true),
        position: z
          .string({
            required_error: 'Field is required',
            invalid_type_error: 'Value must be a number',
          })
          .refine((val) => !Number.isNaN(parseInt(val, 10)), {
            message: 'Value must be a number',
          })
          .transform((val) => parseInt(val, 10)),
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
        releaseDate: z
          .date({
            required_error: 'Field is required',
            invalid_type_error: 'Value must be a date',
          })
          .transform((val) => val.toISOString()),
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
        screensList: z.custom<FileList>((payload) => {
          // TODO change this
          if (mode === 'create') {
            if (!(payload instanceof FileList)) {
              return false;
            }

            if (payload.length === 0) {
              return false;
            }
          }

          return true;
        }),
        // .refine(
        //   (payload) => {
        //     const images = Array.from(payload).filter((item) => item.size <= 3 * 1024 * 1024);
        //     return images.length === payload.length; // TODO rework this check!
        //   },
        //   {
        //     message: 'Image must not exceed 3MB',
        //   },
        // ),
      }),
    [mode],
  );

  const formModel = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (mode === 'update' && data) {
      formModel.reset({
        title: data.title,
        visibility: data.visibility,
        description: data.description,
        position: data.position, // TODO must be a Number
        mainTechnology: data.mainTechnology,
        technologies: data.technologies,
        releaseDate: data.releaseDate, // TODO must be a Date
        repository: data.repository,
        demo: data.demo,
        // TODO screensList must be viewed like a slideshow and must be removable
      });
    }
  }, [data, formModel, mode]);

  const onSuccessCallback = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: [RoutePath.PROJECTS],
    });

    toast({
      title: 'Success',
      description: 'Project was successfully uploaded.',
    });

    formModel.reset();

    if (mode === 'update') {
      router.back();
    }
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
    mutationFn: async (values: ICreateProjectDto) => (mode === 'create' ? await createProject(values) : await updateProject({...values, id: projectID})),
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

  const updateTechnologyList = (list: string[]) => {
    formModel.setValue<'technologies'>('technologies', list);
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
                placeholder={'Project title...'}
                required={true}
                disabled={isLoading}
                isDataPending={false}
              />

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

              <AppSwitch formModel={formModel} name={'visibility'} label={'Project visibility'} placeholder={'Change project visibility'} required={true} disabled={isLoading} />

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

              <ProjectTechnologiesListForm formModelControl={formModel.control} updateTechnologyList={updateTechnologyList} />

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
            </div>

            <div className="grid grid-cols-1 gap-4 md:gap-6">
              <div className="flex h-80 flex-col items-center justify-center gap-6 rounded-md border border-dashed border-primary/30">
                <div className="flex flex-col items-center justify-center gap-1">
                  <h4 className="text-xl font-bold">Drop images hier</h4>
                  <span className="font-bold">to send them</span>
                </div>

                <AppFormInputFile
                  multiple={true}
                  accept={'.jpg, .jpeg, .png'}
                  label={'Screenshots'}
                  name={'screensList'}
                  disabled={isLoading}
                  required={true}
                  formModel={formModel}
                  isDataPending={isLoading}
                />
              </div>
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

export default CreateOrUpdateProjectForm;
