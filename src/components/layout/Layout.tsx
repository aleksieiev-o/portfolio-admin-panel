import React, {FC, PropsWithChildren, ReactElement} from 'react';
import RootLayout from '@/components/layout/RootLayout';
import NavMenu from '@/components/UI/NavMenu/NavMenu';

interface Props extends PropsWithChildren {
  title: string;
  description?: string;
}

const Layout: FC<Props> = (props): ReactElement => {
  const {children, title, description} = props;

  return (
    <RootLayout title={title} description={description || ''}>
      <NavMenu />

      {children}
    </RootLayout>
  );
};

export default Layout;
