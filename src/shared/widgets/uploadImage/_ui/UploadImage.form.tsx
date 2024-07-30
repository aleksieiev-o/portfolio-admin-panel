'use client';

import {Input} from '@/components/ui/input';
import {useToast} from '@/components/ui/use-toast';
import {FC, ReactElement, useId, useMemo} from 'react';
import {useLoading} from '../../../hooks/useLoading';
import SubmitButton from '../../../ui/appButton/Submit.button';
import {FormField, FormItem, FormLabel, FormControl, FormMessage, Form} from '@/components/ui/form';
import {Asterisk} from 'lucide-react';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {IFile} from 'my-portfolio-types';
import {updateMainImage} from '@/entities/files.service';

interface Props {
  multiple: boolean;
  currentImage: IFile | null;
}

const UploadImageForm: FC<Props> = (props): ReactElement => {
  const {multiple, currentImage} = props;
  const formID = useId();
  const {toast} = useToast();
  const {isLoading, setIsLoading} = useLoading();

  const imageUploadSchema = useMemo(
    () =>
      z.object({
        image: z.instanceof(File).refine((file) => file.size <= 3000000, {
          message: 'Your image must not exceed 3MB',
        }),
      }),
    [],
  );

  const formModel = useForm<z.infer<typeof imageUploadSchema>>({
    resolver: zodResolver(imageUploadSchema),
  });

  const handleSubmitForm = async (values: z.infer<typeof imageUploadSchema>) => {
    setIsLoading(true);

    try {
      await updateMainImage(currentImage, values.image);

      toast({
        title: 'Success',
        description: 'Image was successfully uploaded.',
      });

      formModel.reset();
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
    <div className="flex w-full flex-col items-center justify-center gap-4 px-4 md:gap-6 md:px-6">
      <Form {...formModel}>
        <form onSubmit={formModel.handleSubmit(handleSubmitForm)} id={formID} className={'flex w-full flex-col items-start justify-center gap-4'}>
          <div className="flex h-80 w-full flex-col items-center justify-center gap-6 rounded-md border border-dashed border-primary/30">
            <div className="flex flex-col items-center justify-center gap-1">
              <h4 className="text-xl font-bold">Drop image hier</h4>
              <span className="font-bold">to send it</span>
            </div>

            <FormField
              control={formModel.control}
              name="image"
              render={({field: {value, onChange, ...fieldProps}}) => (
                <FormItem>
                  <FormLabel aria-required={true} className={'flex'}>
                    <span className={'mr-0.5'}>Image</span>
                    <Asterisk className={'h-2.5 w-2.5 self-start stroke-destructive'} />
                  </FormLabel>

                  <FormControl aria-required={true}>
                    <Input
                      {...fieldProps}
                      type="file"
                      accept=".jpg, .jpeg, .png"
                      aria-required={true}
                      multiple={multiple}
                      onChange={(event) => onChange(event.target.files && event.target.files[0])}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>

      <SubmitButton formId={formID} title={'Upload'} btnBody={'Upload'} isLoading={isLoading} disabled={isLoading} />
    </div>
  );
};

export default UploadImageForm;
