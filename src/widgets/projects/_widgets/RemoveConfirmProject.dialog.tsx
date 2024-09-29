import {useToast} from '@/components/ui/use-toast';
import {removeProjectById} from '@/entities/projects/projects.service';
import {useLoading} from '@/shared/hooks/useLoading';
import {RoutePath} from '@/shared/router/Routes.enum';
import RemoveConfirmDialog from '@/shared/ui/appDialog/RemoveConfirm.dialog';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {IProject} from 'my-portfolio-types';
import {FC, ReactElement} from 'react';

interface Props {
  project: IProject;
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
}

const RemoveConfirmProjectDialog: FC<Props> = (props): ReactElement => {
  const {project, dialogIsOpen, setDialogIsOpen} = props;
  const {toast} = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const queryClient = useQueryClient();

  const onSuccessCallback = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: [RoutePath.PROJECTS],
    });

    toast({
      title: 'Success',
      description: 'The project has successfully removed.',
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
    mutationFn: async (id: string) => await removeProjectById(project, id),
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
    mutation.mutate(project.id);
  };

  return (
    <RemoveConfirmDialog
      isLoading={isLoading}
      dialogIsOpen={dialogIsOpen}
      setDialogIsOpen={setDialogIsOpen}
      handleConfirm={handleConfirm}
      dialogTitle={'Remove project confirmation'}
      dialogDescription={'You are about to remove this project.'}
      dialogQuestion={'Are you sure you want to delete this project?'}
      btnTitle={'Remove project'}
      btnBody={'Remove'}
    />
  );
};

export default RemoveConfirmProjectDialog;
