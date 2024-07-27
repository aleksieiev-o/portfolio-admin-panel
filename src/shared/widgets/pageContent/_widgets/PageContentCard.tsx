import {Card, CardContent} from '@/components/ui/card';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {FC, ReactElement, PropsWithChildren} from 'react';
import {RoutePath} from '@/shared/router/Routes.enum';
import {IBaseEntity} from 'my-portfolio-types';
import {Eye, EyeOff} from 'lucide-react';
import CardFooterActions from './_cardActions/CardFooterActions';
import TextCardDateFormat from './TextCardDateFormat';
import CardHeaderActions from './_cardActions/CardHeaderActions';

interface Props extends PropsWithChildren, IBaseEntity {}

const PageContentCard: FC<Props> = (props): ReactElement => {
  const {children, id, title, position, visibility, createdDate, updatedDate} = props;

  return (
    <Card className="flex w-full flex-col bg-primary/5 shadow-md">
      <CardHeaderActions id={id} title={title} />

      <CardContent className="flex h-full flex-col gap-4 md:gap-6">
        <div className="flex flex-row flex-nowrap items-center justify-start gap-4 md:gap-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{visibility ? <Eye className="stroke-primary" /> : <EyeOff className="stroke-destructive" />}</TooltipTrigger>

              <TooltipContent>
                <span>{visibility ? 'It is visible' : 'It is hidden'}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex flex-row flex-nowrap gap-2">
            <span className="font-bold">Position: </span>
            <span>{position}</span>
          </div>
        </div>

        {children}

        <div className="mt-auto flex flex-col items-start justify-start gap-2">
          <TextCardDateFormat variant="muted" title="Created:" date={createdDate} />

          <TextCardDateFormat variant="muted" title="Updated:" date={updatedDate} />
        </div>
      </CardContent>

      <CardFooterActions
        pageDirection={RoutePath.UPDATE_PROJECT}
        dynamicId={id}
        updateButtonTitle="Edit project"
        removeButtonTitle="Remove project"
        handleRemove={() => undefined}
      />
    </Card>
  );
};

export default PageContentCard;
