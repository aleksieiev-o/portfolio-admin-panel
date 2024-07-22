import {Metadata} from 'next';

export const createAppMetaData = (metaData: Metadata): Metadata => {
  const {title, description} = metaData;

  if (description) {
    return {
      title: `${title} | Portfolio admin panel`,
      description,
      openGraph: {
        title: `${title} | Portfolio admin panel`,
        description,
      },
    };
  }

  return {
    title: `${title} | Portfolio admin panel`,
    robots: {
      index: false,
      follow: false,
    },
  };
};
