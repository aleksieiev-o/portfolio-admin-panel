import {useToast} from '@/components/ui/use-toast';
import {useLoading} from '@/shared/hooks/useLoading';
import {RoutePath} from '@/shared/router/Routes.enum';
import RemoveConfirmDialog from '@/shared/ui/appDialog/RemoveConfirm.dialog';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {FC, ReactElement} from 'react';

interface Props {
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
  dialogTitle: string;
  dialogDescription: string;
  dialogQuestion: string;
  btnTitle: string;
  toastDescription: string;
  handleRemoveAll: () => Promise<void>;
  queryKey: RoutePath;
}

const RemoveAllConfirmDialog: FC<Props> = (props): ReactElement => {
  const {dialogIsOpen, setDialogIsOpen, dialogTitle, dialogDescription, dialogQuestion, btnTitle, toastDescription, handleRemoveAll, queryKey} = props;
  const {toast} = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const queryClient = useQueryClient();

  const onSuccessCallback = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: [queryKey],
    });

    toast({
      title: 'Success',
      description: toastDescription,
    });
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
    setDialogIsOpen(false);
  };

  const mutation = useMutation({
    mutationFn: async () => await handleRemoveAll(),
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

  const handleConfirm = () => {
    setIsLoading(true);
    mutation.mutate();
  };

  return (
    <RemoveConfirmDialog
      isLoading={isLoading}
      dialogIsOpen={dialogIsOpen}
      setDialogIsOpen={setDialogIsOpen}
      handleConfirm={handleConfirm}
      dialogTitle={dialogTitle}
      dialogDescription={dialogDescription}
      dialogQuestion={dialogQuestion}
      btnTitle={btnTitle}
      btnBody={'Remove all'}
    />
  );
};

export default RemoveAllConfirmDialog;
