export enum ProtectedRoutePath {
  PERSONAL_INFO = '/personal-info',
  PROJECTS = '/projects',
  SKILLS = '/skills',
  SOCIALS = '/socials',
  CREATE_PROJECT = '/projects/create',
  UPDATE_PROJECT = '/projects/update/[id]',
  CREATE_SKILL = '/create-skill',
  CREATE_SOCIAL = '/create-social',
}

export enum PublicRoutePath {
  LOGIN = '/login',
}

export enum ProtectedRouteName {
  PERSONAL_INFO = 'Personal info',
  PROJECTS = 'Projects',
  SKILLS = 'Skills',
  SOCIALS = 'Socials',
}
