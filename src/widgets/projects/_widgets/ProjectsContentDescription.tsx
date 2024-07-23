'use client';

import {Button} from '@/components/ui/button';
import {useToast} from '@/components/ui/use-toast';
import {useCopyToClipboard} from '@/shared/hooks/useCopyToClipboard';
import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/components/ui/hover-card';
import {Copy} from 'lucide-react';
import {FC, ReactElement} from 'react';

interface Props {
  description: string;
}

const ProjectsContentDescription: FC<Props> = (props): ReactElement => {
  const {description} = props;
  const {toast} = useToast();
  const [_, copyValue] = useCopyToClipboard();

  const handleCopyValue = async () => {
    const result = await copyValue(description || '');

    toast({
      variant: result ? 'default' : 'destructive',
      title: result ? 'Project description has been copied' : `Project description hasn't been copied`,
    });
  };

  return (
    <div className="flex flex-row flex-nowrap items-center justify-start gap-2">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link" className="text-md h-auto p-0">
            Description
          </Button>
        </HoverCardTrigger>

        <HoverCardContent>{description}</HoverCardContent>
      </HoverCard>

      <Button onClick={handleCopyValue} variant="ghost" size="icon" title="Copy to clipboard" className="h-7 w-7">
        <Copy className="h-2.5 w-2.5" />
      </Button>
    </div>
  );
};

export default ProjectsContentDescription;
