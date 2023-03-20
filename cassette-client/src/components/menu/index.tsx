import User from '@icon/user.svg';
import { ButtonLayout } from 'components/button/style';
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
        <ButtonLayout
          variant="clear"
          as="button"
          aria-label="메뉴 열기"
          onClick={() => {
            setOpenMenu('open');
          }}
        >
          <User />
        </ButtonLayout>
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
