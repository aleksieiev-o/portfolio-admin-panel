import {FC, ReactElement} from 'react';

interface Props {
  test: string;
}

const DocumentsContent: FC<Props> = (props): ReactElement => {
  const {test} = props;

  return <div>DocumentsContent</div>;
};

export default DocumentsContent;
