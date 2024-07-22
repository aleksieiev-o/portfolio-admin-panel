import {RouteName, RoutePath} from '@/shared/router/Routes.enum';
import {ElementType} from 'react';
import {BookCheck, FolderGit2, NotebookPen, SquareUserRound, File, UserRoundCog} from 'lucide-react';

interface Rout {
  href: RoutePath;
  name: RouteName;
  Icon: ElementType;
}

type Router = Array<Rout>;

export const router: Router = [
  {href: RoutePath.PERSONAL_INFO, name: RouteName.PERSONAL_INFO, Icon: SquareUserRound},
  {href: RoutePath.PROJECTS, name: RouteName.PROJECTS, Icon: FolderGit2},
  {href: RoutePath.SKILLS, name: RouteName.SKILLS, Icon: BookCheck},
  {href: RoutePath.SOCIALS, name: RouteName.SOCIALS, Icon: NotebookPen},
  {href: RoutePath.DOCUMENTS, name: RouteName.DOCUMENTS, Icon: File},
  {href: RoutePath.USER_SETTINGS, name: RouteName.USER_SETTINGS, Icon: UserRoundCog},
];
