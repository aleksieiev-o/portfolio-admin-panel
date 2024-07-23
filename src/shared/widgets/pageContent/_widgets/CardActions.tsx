import {Button} from '@/components/ui/button';
import {Pencil, Trash} from 'lucide-react';
import {FC, ReactElement} from 'react';
import {CardFooter} from '@/components/ui/card';
import Link from 'next/link';
import {RoutePath} from '@/shared/router/Routes.enum';

interface Props {
  pageDirection: RoutePath;
  dynamicId: string;
  updateButtonTitle: string;
  removeButtonTitle: string;
  handleRemove: () => void;
}

const CardActions: FC<Props> = (props): ReactElement => {
  const {pageDirection, dynamicId, updateButtonTitle, removeButtonTitle, handleRemove} = props;

  return (
    <CardFooter className="flex flex-row flex-nowrap items-center justify-end gap-4 md:gap-6">
      <Link href={`${pageDirection}?id=${dynamicId}`}>
        <Button variant={'default'} title={updateButtonTitle} className="gap-2">
          <Pencil className="h-5 w-5" />
          <span>Edit</span>
        </Button>
      </Link>

      <Button onClick={() => handleRemove()} variant={'destructive'} title={removeButtonTitle} className="gap-2">
        <Trash className="h-5 w-5" />
        <span>Remove</span>
      </Button>
    </CardFooter>
  );
};

export default CardActions;
