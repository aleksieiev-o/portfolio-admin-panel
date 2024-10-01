'use client';

import {useToast} from '@/components/ui/use-toast';
import {removeDocumentById} from '@/entities/documents/documents.service';
import {useLoading} from '@/shared/hooks/useLoading';
import {RoutePath} from '@/shared/router/Routes.enum';
import RemoveConfirmDialog from '@/shared/ui/appDialog/RemoveConfirm.dialog';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {IDocument} from 'my-portfolio-types';
import {FC, ReactElement} from 'react';

interface Props {
  document: IDocument;
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
}

const RemoveDocumentConfirmDialog: FC<Props> = (props): ReactElement => {
  const {document, dialogIsOpen, setDialogIsOpen} = props;
  const {toast} = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const queryClient = useQueryClient();

  const onSuccessCallback = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: [RoutePath.DOCUMENTS],
    });

    toast({
      title: 'Success',
      description: 'The document has successfully removed.',
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
    mutationFn: async (id: string) => await removeDocumentById(id),
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
    mutation.mutate(document.id);
  };

  return (
    <RemoveConfirmDialog
      isLoading={isLoading}
      dialogIsOpen={dialogIsOpen}
      setDialogIsOpen={setDialogIsOpen}
      handleConfirm={handleConfirm}
      dialogTitle={'Remove document confirmation'}
      dialogDescription={'You are about to remove this document.'}
      dialogQuestion={'Are you sure you want to remove this document?'}
      btnTitle={'Remove document'}
      btnBody={'Remove'}
    />
  );
};

export default RemoveDocumentConfirmDialog;
