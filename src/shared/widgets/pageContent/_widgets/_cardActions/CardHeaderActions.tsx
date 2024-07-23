'use client';

import {Button} from '@/components/ui/button';
import {CardHeader, CardTitle, CardDescription} from '@/components/ui/card';
import {useToast} from '@/components/ui/use-toast';
import {useCopyToClipboard} from '@/shared/hooks/useCopyToClipboard';
import {Grip, Copy} from 'lucide-react';
import {FC, ReactElement} from 'react';

interface Props {
  id: string;
  title: string;
}

const CardHeaderActions: FC<Props> = (props): ReactElement => {
  const {id, title} = props;
  const {toast} = useToast();
  const [_, copyValue] = useCopyToClipboard();

  const handleCopyValue = async () => {
    const result = await copyValue(id || '');

    toast({
      variant: result ? 'default' : 'destructive',
      title: result ? 'ID has been copied' : `ID hasn't been copied`,
    });
  };

  return (
    <CardHeader>
      <div className="flex w-full flex-row flex-nowrap items-center justify-between gap-6 overflow-hidden">
        <CardTitle className="w-full overflow-hidden text-ellipsis whitespace-nowrap" title={title}>
          {title}
        </CardTitle>

        <Grip className="cursor-grab transition-all hover:scale-110 hover:stroke-primary" />
      </div>

      <div className="flex w-full flex-row flex-nowrap items-center justify-start gap-2">
        <CardDescription>{id}</CardDescription>

        <Button onClick={handleCopyValue} variant="ghost" size="icon" title="Copy to clipboard" className="h-7 w-7">
          <Copy className="h-2.5 w-2.5" />
        </Button>
      </div>
    </CardHeader>
  );
};

export default CardHeaderActions;
