import {Button} from '@/components/ui/button';
import {ExternalLink} from 'lucide-react';
import {FC, ReactElement} from 'react';

interface Props {
  link: string;
  title: string;
}

const ExternalLinkButton: FC<Props> = (props): ReactElement => {
  const {link, title} = props;

  return (
    <a href={link} target="_blank">
      <Button variant="ghost" size="icon" title={title} className="h-8 w-8">
        <ExternalLink className="h-4 w-4" />
      </Button>
    </a>
  );
};

export default ExternalLinkButton;
