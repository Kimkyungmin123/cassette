import { ReactNode } from 'react';

import { Children } from './style';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <Children>{children}</Children>;
};

export default Layout;
