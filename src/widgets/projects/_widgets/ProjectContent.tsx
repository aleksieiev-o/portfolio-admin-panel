import {Badge} from '@/components/ui/badge';
import ExternalLinkButton from '@/shared/ui/appButton/ExternalLink.button';
import TextCardDateFormat from '@/shared/widgets/pageContent/_widgets/TextCardDateFormat';
import {IProject} from 'my-portfolio-types';
import {FC, ReactElement} from 'react';
import ProjectsContentDescription from './ProjectsContentDescription';

type Props = Pick<IProject, 'description' | 'mainTechnology' | 'releaseDate' | 'demo' | 'repository' | 'screensList' | 'technologies'>;

const ProjectContent: FC<Props> = (props): ReactElement => {
  const {description, mainTechnology, releaseDate, demo, repository, screensList, technologies} = props;

  return (
    <div className="flex flex-col gap-4">
      <ProjectsContentDescription description={description} />

      <div className="flex flex-row flex-nowrap items-center justify-start gap-2">
        <span className="font-bold">Demo link:</span>
        <ExternalLinkButton link={demo} title="Open demo" />
      </div>

      <div className="flex flex-row flex-nowrap items-center justify-start gap-2">
        <span className="font-bold">Repository link:</span>
        <ExternalLinkButton link={repository} title="Open repository" />
      </div>

      <TextCardDateFormat variant="default" date={releaseDate} title="Released:" />

      <div className="flex flex-row flex-nowrap items-center justify-start gap-2">
        <span className="font-bold">Main technology:</span>
        <Badge variant="success">{mainTechnology}</Badge>
      </div>

      <div className="flex w-full flex-col gap-4">
        <span className="font-bold">Stack of technologies:</span>

        <div className="flex w-full flex-row flex-wrap items-center justify-start gap-2 overflow-hidden">
          {technologies.map((item) => (
            <Badge key={item} variant="info">
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectContent;
