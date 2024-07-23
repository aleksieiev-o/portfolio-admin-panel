import {Loader2} from 'lucide-react';
import {FC, ReactElement} from 'react';

const ContentLoader: FC = (): ReactElement => {
  return (
    <div className={'flex h-full w-full items-center justify-center overflow-hidden'}>
      <Loader2 className={'duration-2000 h-10 w-10 animate-spin stroke-primary'} />
    </div>
  );
};

export default ContentLoader;
