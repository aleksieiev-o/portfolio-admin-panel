import {ExternalLink} from 'lucide-react';
import {ISocial} from 'my-portfolio-types';
import {FC, ReactElement} from 'react';
import {Button} from '@/components/ui/button';

type Props = Pick<ISocial, 'url' | 'iconName'>;

const SocialsContent: FC<Props> = (props): ReactElement => {
  const {url, iconName} = props;

  return (
    <div>
      <div className="flex flex-row flex-nowrap items-center justify-start gap-2">
        <span>Link:</span>

        <a href={url} target="_blank">
          <Button variant="ghost" size="icon" title="Open link" className="h-8 w-8">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </a>
      </div>

      <div className="flex flex-row flex-nowrap items-center justify-start gap-2">
        <span>Icon name:</span>

        <span>{iconName}</span>
      </div>
    </div>
  );
};

export default SocialsContent;
