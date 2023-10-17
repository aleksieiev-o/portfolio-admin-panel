import { ProtectedRouteName, ProtectedRoutePath } from '@/router/Routes.enum';

interface Rout {
  href: ProtectedRoutePath;
  name: ProtectedRouteName;
}

type Router = Array<Rout>;

export const router: Router = [
  { href: ProtectedRoutePath.PERSONAL_INFO, name: ProtectedRouteName.PERSONAL_INFO },
  { href: ProtectedRoutePath.PROJECTS, name: ProtectedRouteName.PROJECTS },
  { href: ProtectedRoutePath.SKILLS, name: ProtectedRouteName.SKILLS },
  { href: ProtectedRoutePath.SOCIALS, name: ProtectedRouteName.SOCIALS },
  { href: ProtectedRoutePath.DOCUMENTS, name: ProtectedRouteName.DOCUMENTS },
];
