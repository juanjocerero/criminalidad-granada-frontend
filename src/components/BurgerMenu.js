import React from 'react';
import { slide as Menu } from 'react-burger-menu';

import '../css/BurgerMenu.scss';

const BurgerMenu = ({ id }) => {

  return (
    <Menu id={id}>
      <a className="menu-item" href="/">De vuelta</a>
    </Menu>
  );

};

export default BurgerMenu;