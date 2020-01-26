import React, { useContext, useState, useEffect, useRef } from 'react';
import { scaleRotate as Menu } from 'react-burger-menu';
import Button from '@bit/ans.base-ui.button';

import { FilterContext } from './FilterContext';
import { FilterContextProvider } from './FilterContextProvider';

import '../css/BurgerMenu.scss';

const MenuElements = ({id}) => {
  
  const context = useContext(FilterContext);
  
  const [state, setState] = useState({ shouldUpdateQueries: true });
  
  const closeButtonRef = useRef();
  useEffect(() => {
    const closeButton = document.querySelector('.bm-cross-button button');
    closeButton.addEventListener('click', () => {
      context.handleSidebarChanges(state);
    });
    
    closeButtonRef.current = closeButton;
  }, []);
  
  return (<Menu id={id} pageWrapId={"page-wrap"} outerContainerId={"main-visualization-container"} isOpen={context.isMenuOpen} onStateChange={(state) => { context.stateChangeHandler(state); context.handleSidebarChanges(state); } }>
  
  <Button loading={false} icon="AlignJustify" size="small" onClick={() => { context.toggleMenu(); context.handleSidebarChanges(state); }} className="apply-changes-button">Aplicar cambios</Button>
  
  </Menu>
  );
};

const BurgerMenu = ({ id }) =>  (<FilterContextProvider><MenuElements id={id} /></FilterContextProvider>);

export default BurgerMenu;
