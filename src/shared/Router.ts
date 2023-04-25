import { RouteName, RoutePath } from '@/shared/Routes.enum';

interface Rout {
  href: RoutePath;
  name: RouteName;
}

type Router = Array<Rout>;

export const router: Router = [
  { href: RoutePath.PERSONAL_INFO, name: RouteName.PERSONAL_INFO },
  { href: RoutePath.PROJECTS, name: RouteName.PROJECTS },
  { href: RoutePath.SKILLS, name: RouteName.SKILLS },
  { href: RoutePath.SOCIALS, name: RouteName.SOCIALS },
];
