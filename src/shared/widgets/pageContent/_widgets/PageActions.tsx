import {Button} from '@/components/ui/button';
import {Plus, Trash2} from 'lucide-react';
import {FC, ReactElement} from 'react';
import {RoutePath} from '@/shared/router/Routes.enum';
import Link from 'next/link';

interface Props {
  createButtonTitle: string;
  createButtonLink: RoutePath;
  removeButtonTitle: string;
  setDialogIsOpen: (value: boolean) => void;
  isEmptyList: boolean;
}

const PageActions: FC<Props> = (props): ReactElement => {
  const {createButtonTitle, removeButtonTitle, createButtonLink, setDialogIsOpen, isEmptyList} = props;

  const handlePrepareToRemoveAll = () => {
    setDialogIsOpen(true);
  };

  return (
    <div className="flex h-full flex-row flex-nowrap items-center justify-start gap-4 md:gap-6">
      <Link href={createButtonLink}>
        <Button variant={'default'} title={createButtonTitle} className="gap-2">
          <Plus className="h-5 w-5" />

          <span className="hidden md:inline">Create</span>
        </Button>
      </Link>

      {!isEmptyList && (
        <Button onClick={handlePrepareToRemoveAll} variant={'destructive'} title={removeButtonTitle} className="gap-2">
          <Trash2 className="h-5 w-5" />

          <span className="hidden md:inline">Remove all</span>
        </Button>
      )}
    </div>
  );
};

export default PageActions;
