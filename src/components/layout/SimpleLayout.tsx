import React, { FC, PropsWithChildren, ReactElement } from 'react';
import RootLayout from '@/components/layout/RootLayout';

interface Props extends PropsWithChildren {
  title: string;
  description?: string;
}

const SimpleLayout: FC<Props> = (props): ReactElement => {
  const {children, title, description} = props;

  return (
    <RootLayout title={title} description={description || ''}>
      {children}
    </RootLayout>
  );
};

export default SimpleLayout;
