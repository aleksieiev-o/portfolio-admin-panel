import {IDocument} from 'my-portfolio-types';
import {FC, ReactElement} from 'react';

interface Props extends Pick<IDocument, 'lang'> {}

const DocumentsContent: FC<Props> = (props): ReactElement => {
  const {lang} = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row flex-nowrap items-center justify-start gap-2">
        <span className="font-bold">Language:</span>
        <span className="uppercase">{lang}</span>
      </div>
    </div>
  );
};

export default DocumentsContent;
