import User from '@icon/user.svg';
import { useState } from 'react';

import NavBar from './navBar';
import { IconContainer, MenuContainer } from './style';

interface MenuLayoutProps {
  name: string;
}

const MenuLayout = ({ name }: MenuLayoutProps) => {
  const [oepnMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <>
      <IconContainer
        onClick={() => {
          setOpenMenu('open');
        }}
      >
        <div>
          <User />
        </div>
      </IconContainer>

      <MenuContainer>
        <NavBar
          name={name}
          isOpen={() => {
            setOpenMenu('close');
          }}
          status={oepnMenu}
        />
      </MenuContainer>
    </>
  );
};

export default MenuLayout;
