import {FC, ReactElement} from 'react';

interface Props {
  test: string;
}

const SocialsContent: FC<Props> = (props): ReactElement => {
  const {test} = props;

  return <div>SocialsContent</div>;
};

export default SocialsContent;
