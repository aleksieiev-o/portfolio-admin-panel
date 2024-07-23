import {FC, ReactElement} from 'react';

interface Props {
  test: string;
}

const ProjectContent: FC<Props> = (props): ReactElement => {
  const {test} = props;

  return <div>ProjectContent</div>;
};

export default ProjectContent;
