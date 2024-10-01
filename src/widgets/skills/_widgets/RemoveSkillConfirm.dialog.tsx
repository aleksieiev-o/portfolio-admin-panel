'use client';

import {useToast} from '@/components/ui/use-toast';
import {removeSkillById} from '@/entities/skills/skills.service';
import {useLoading} from '@/shared/hooks/useLoading';
import {RoutePath} from '@/shared/router/Routes.enum';
import RemoveConfirmDialog from '@/shared/ui/appDialog/RemoveConfirm.dialog';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {ISkill} from 'my-portfolio-types';
import {FC, ReactElement} from 'react';

interface Props {
  skill: ISkill;
  dialogIsOpen: boolean;
  setDialogIsOpen: (value: boolean) => void;
}

const RemoveSkillConfirmDialog: FC<Props> = (props): ReactElement => {
  const {skill, dialogIsOpen, setDialogIsOpen} = props;
  const {toast} = useToast();
  const {isLoading, setIsLoading} = useLoading();
  const queryClient = useQueryClient();

  const onSuccessCallback = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: [RoutePath.SKILLS],
    });

    toast({
      title: 'Success',
      description: 'The skill has successfully removed.',
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
    mutationFn: async (id: string) => await removeSkillById(id),
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
    mutation.mutate(skill.id);
  };

  return (
    <RemoveConfirmDialog
      isLoading={isLoading}
      dialogIsOpen={dialogIsOpen}
      setDialogIsOpen={setDialogIsOpen}
      handleConfirm={handleConfirm}
      dialogTitle={'Remove skill confirmation'}
      dialogDescription={'You are about to remove this skill.'}
      dialogQuestion={'Are you sure you want to remove this skill?'}
      btnTitle={'Remove skill'}
      btnBody={'Remove'}
    />
  );
};

export default RemoveSkillConfirmDialog;
