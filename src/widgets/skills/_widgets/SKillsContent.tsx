import {FC, ReactElement} from 'react';

interface Props {
  test: string;
}

const SkillsContent: FC<Props> = (props): ReactElement => {
  const {test} = props;

  return <div>SkillsContent</div>;
};

export default SkillsContent;
