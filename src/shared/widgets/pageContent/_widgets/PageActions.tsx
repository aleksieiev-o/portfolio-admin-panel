import {Button} from '@/components/ui/button';
import {Plus, Trash2} from 'lucide-react';
import {FC, ReactElement} from 'react';

interface Props {
  createButtonTitle: string;
  removeButtonTitle: string;
}

const PageActions: FC<Props> = (props): ReactElement => {
  const {createButtonTitle, removeButtonTitle} = props;

  return (
    <div className="flex h-full flex-row flex-nowrap items-center justify-start gap-4 md:gap-6">
      <Button variant={'default'} title={createButtonTitle} className="gap-2">
        <Plus className="h-5 w-5" />

        <span className="hidden md:inline">Create</span>
      </Button>

      <Button variant={'destructive'} title={removeButtonTitle} className="gap-2">
        <Trash2 className="h-5 w-5" />

        <span className="hidden md:inline">Remove all</span>
      </Button>
    </div>
  );
};

export default PageActions;
