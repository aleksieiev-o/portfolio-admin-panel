import React, { FC, PropsWithChildren, ReactElement } from 'react';
import RootLayout from '@/components/layout/RootLayout';

const SimpleLayout: FC<PropsWithChildren> = (props): ReactElement => {
  const {children, title, description} = props;

  return (
    <RootLayout title={title} description={description || ''}>
      {children}
    </RootLayout>
  );
};

export default SimpleLayout;
