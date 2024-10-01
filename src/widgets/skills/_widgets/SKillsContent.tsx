import {Badge} from '@/components/ui/badge';
import {ISkill} from 'my-portfolio-types';
import {FC, ReactElement} from 'react';

interface Props {
  skill: ISkill;
}

const SkillsContent: FC<Props> = (props): ReactElement => {
  const {skill} = props;
  const {experience, color, isMain} = skill;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row flex-nowrap items-center justify-start gap-2">
        <span className="font-bold">Experience:</span>
        <span>{experience}%</span>
      </div>

      <div>
        <Badge style={{backgroundColor: `${color}`}}>Skill color</Badge>
      </div>

      <div>
        <Badge variant={isMain ? 'success' : 'info'}>{isMain ? 'Main skill' : 'Secondary skill'}</Badge>
      </div>
    </div>
  );
};

export default SkillsContent;
