export enum ProtectedRoutePath {
  PERSONAL_INFO = '/personal-info',

  PROJECTS = '/projects',
  SKILLS = '/skills',
  SOCIALS = '/socials',
  DOCUMENTS = '/documents',

  CREATE_PROJECT = '/projects/create',
  UPDATE_PROJECT = '/projects/update/[id]',

  CREATE_SKILL = '/skills/create',
  UPDATE_SKILL = '/skills/update/[id]',

  CREATE_SOCIAL = '/socials/create',
  UPDATE_SOCIAL = '/socials/update/[id]',

  CREATE_DOCUMENT = '/documents/create',
  UPDATE_DOCUMENT = '/documents/update/[id]',

  BIO = 'bio',
  MAIN_IMAGE = 'main-image',
}

export enum PublicRoutePath {
  LOGIN = '/login',
}

export enum ProtectedRouteName {
  PERSONAL_INFO = 'Personal info',
  PROJECTS = 'Projects',
  SKILLS = 'Skills',
  SOCIALS = 'Socials',
  DOCUMENTS = 'Documents',
}
