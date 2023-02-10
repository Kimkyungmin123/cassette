import User from '@icon/user.svg';
import Button from 'components/button';
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
      <IconContainer>
        <Button
          variant="clear"
          onClick={() => {
            setOpenMenu('open');
          }}
        >
          <User />
        </Button>
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
