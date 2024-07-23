import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {FC, ReactElement, PropsWithChildren} from 'react';
import {RoutePath} from '@/shared/router/Routes.enum';
import {IBaseEntity} from 'my-portfolio-types';
import {Eye, EyeOff} from 'lucide-react';
import CardActions from './CardActions';
import TextCardDateFormat from './TextCardDateFormat';

interface Props extends PropsWithChildren, IBaseEntity {}

const PageContentCard: FC<Props> = (props): ReactElement => {
  const {children, id, title, position, visibility, createdDate, updatedDate} = props;

  return (
    <Card className="w-full bg-primary/5">
      <CardHeader>
        <CardTitle>{title}</CardTitle>

        <CardDescription>{id}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-row flex-nowrap items-center justify-start gap-4 md:gap-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{visibility ? <Eye className="stroke-primary" /> : <EyeOff className="stroke-destructive" />}</TooltipTrigger>

              <TooltipContent>
                <span>{visibility ? 'Visible' : 'Hidden'}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="font-bold text-muted-foreground">Position: {position}</span>
        </div>

        {children}

        <div className="flex flex-col items-start justify-start gap-2">
          <TextCardDateFormat title="Created:" date={createdDate} />

          <TextCardDateFormat title="Updated:" date={updatedDate} />
        </div>
      </CardContent>

      <CardActions pageDirection={RoutePath.UPDATE_PROJECT} dynamicId={id} updateButtonTitle="Edit project" removeButtonTitle="Remove project" handleRemove={() => undefined} />
    </Card>
  );
};

export default PageContentCard;
