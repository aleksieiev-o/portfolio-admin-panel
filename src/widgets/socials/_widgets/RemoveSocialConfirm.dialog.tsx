'use client';

import {useToast} from '@/components/ui/use-toast';
import {removeSocialById} from '@/entities/socials/socials.service';
import {useLoading} from '@/shared/hooks/useLoading';
import {RoutePath} from '@/shared/router/Routes.enum';
import RemoveConfirmDialog from '@/shared/ui/appDialog/RemoveConfirm.dialog';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {ISocial} from 'my-portfolio-types';
import {FC, ReactElement} from 'react';

interface Props {
  social: ISocial;
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
}

const RemoveSocialConfirmDialog: FC<Props> = (props): ReactElement => {
  const {social, dialogIsOpen, setDialogIsOpen} = props;
  const {toast} = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const queryClient = useQueryClient();

  const onSuccessCallback = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: [RoutePath.SOCIALS],
    });

    toast({
      title: 'Success',
      description: 'The social has successfully removed.',
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
    mutationFn: async (id: string) => await removeSocialById(id),
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
    mutation.mutate(social.id);
  };

  return (
    <RemoveConfirmDialog
      isLoading={isLoading}
      dialogIsOpen={dialogIsOpen}
      setDialogIsOpen={setDialogIsOpen}
      handleConfirm={handleConfirm}
      dialogTitle={'Remove social confirmation'}
      dialogDescription={'You are about to remove this social.'}
      dialogQuestion={'Are you sure you want to remove this social?'}
      btnTitle={'Remove social'}
      btnBody={'Remove'}
    />
  );
};

export default RemoveSocialConfirmDialog;
