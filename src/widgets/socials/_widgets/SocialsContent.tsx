import {ISocial} from 'my-portfolio-types';
import {FC, ReactElement} from 'react';
import ExternalLinkButton from '@/shared/ui/appButton/ExternalLink.button';

type Props = Pick<ISocial, 'url' | 'iconName'>;

const SocialsContent: FC<Props> = (props): ReactElement => {
  const {url, iconName} = props;

  return (
    <div>
      <div className="flex flex-row flex-nowrap items-center justify-start gap-2">
        <span className="font-bold">Link:</span>
        <ExternalLinkButton link={url} title="Open link" />
      </div>

      <div className="flex flex-row flex-nowrap items-center justify-start gap-2">
        <span className="font-bold">Icon name:</span>
        <span>{iconName}</span>
      </div>
    </div>
  );
};

export default SocialsContent;
