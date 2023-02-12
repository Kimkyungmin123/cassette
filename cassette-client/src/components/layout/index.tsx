import { ReactNode } from 'react';

import { Children } from './style';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Children>
      <div
        css={{
          width: '100%',
          maxWidth: '580px',
          minWidth: '375px',
          height: '100%',
        }}
      >
        {children}
      </div>
    </Children>
  );
};

export default Layout;
