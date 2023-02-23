import { ReactNode } from 'react';

import { Children, LayoutContent } from './style';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Children>
      <LayoutContent>{children}</LayoutContent>
    </Children>
  );
};

export default Layout;
