'use client';

import {useToast} from '@/components/ui/use-toast';
import {FC, ReactElement, useId, useMemo, useState} from 'react';
import {Form} from '@/components/ui/form';
import {Upload} from 'lucide-react';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {IFile} from 'my-portfolio-types';
import {updateMainImage} from '@/entities/files.service';
import {Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import SubmitButton from '@/shared/ui/appButton/Submit.button';
import {useLoading} from '@/shared/hooks/useLoading';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {RoutePath} from '@/shared/router/Routes.enum';
import AppFormInputFile from '@/shared/ui/appInput/AppFormInput.file';

interface Props {
  currentImage: IFile | null;
}

const UploadImageDialog: FC<Props> = (props): ReactElement => {
  const {currentImage} = props;
  const formID = useId();
  const {toast} = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const imageUploadSchema = useMemo(
    () =>
      z.object({
        image: z.instanceof(File).refine((file) => file.size <= 3 * 1024 * 1024, {
          message: 'Image must not exceed 3MB',
        }),
      }),
    [],
  );

  const formModel = useForm<z.infer<typeof imageUploadSchema>>({
    resolver: zodResolver(imageUploadSchema),
  });

  const onSuccessCallback = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: [RoutePath.MAIN_IMAGE],
    });

    toast({
      title: 'Success',
      description: 'Image was successfully uploaded.',
    });

    formModel.reset();
    setDialogIsOpen(false);
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
    mutationFn: async (values: {image: File}) => await updateMainImage(currentImage, values.image),
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

  const handleSubmitForm = async (values: z.infer<typeof imageUploadSchema>) => {
    setIsLoading(true);
    mutationCreate.mutate(values);
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setDialogIsOpen(true)} variant="default" className="gap-2" title="Upload an image">
          <Upload className="h-5 w-5" />
          <span>Upload image</span>
        </Button>
      </DialogTrigger>

      <DialogContent className={'flex flex-col gap-6'}>
        <DialogHeader>
          <DialogTitle>Upload image</DialogTitle>

          <DialogDescription>You are about to upload an image.</DialogDescription>
        </DialogHeader>

        <Form {...formModel}>
          <form onSubmit={formModel.handleSubmit(handleSubmitForm)} id={formID} className={'flex w-full flex-col items-start justify-center gap-4'}>
            <div className="flex h-80 w-full flex-col items-center justify-center gap-6 rounded-md border border-dashed border-primary/30">
              <div className="flex flex-col items-center justify-center gap-1">
                <h4 className="text-xl font-bold">Drop image hier</h4>
                <span className="font-bold">to send it</span>
              </div>

              <AppFormInputFile
                multiple={false}
                accept={'.jpg, .jpeg, .png'}
                label={'Image'}
                name={'image'}
                disabled={isLoading}
                required={true}
                formModel={formModel}
                isDataPending={isLoading}
              />
            </div>
          </form>
        </Form>

        <DialogFooter className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button variant={'outline'} title={'Close'}>
              Close
            </Button>
          </DialogClose>

          <SubmitButton formId={formID} title={'Upload this image'} btnBody={'Upload'} isLoading={isLoading} disabled={isLoading} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadImageDialog;
