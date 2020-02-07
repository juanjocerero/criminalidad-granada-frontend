import React, { useContext, useEffect, useRef } from 'react';
import { scaleRotate as Menu } from 'react-burger-menu';
import { Typography } from 'antd';

import CategoryTree from './CategoryTree';
import DateRangePicker from './DatePicker';
import MunicipioSelect from './MunicipioSelect';
import Switcher from './Switcher';
import Button from '@bit/ans.base-ui.button';

import { QueryContext } from './QueryContext';
import { BurgerMenuContext } from './BurgerMenuContextProvider';

import '../../css/Map/BurgerMenu.scss';
import '../../css/common.scss';

const { Title, Text } = Typography;

const MenuElements = ({id}) => {
  const burgerMenuContext = useContext(BurgerMenuContext);
  const { stateShouldUpdate } = useContext(QueryContext);

  // eslint-disable-next-line no-unused-vars
  const [shouldUpdate, setShouldUpdate] = stateShouldUpdate;

  const closeButtonRef = useRef();
  useEffect(() => {
    const closeButton = document.querySelector('.bm-cross-button button');
    closeButton.addEventListener('click', () => {
      setShouldUpdate(true);
    });
    
    closeButtonRef.current = closeButton;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeButtonRef.current]);

  // This hook only gets called once. Sets the blur on the desired element
  useEffect(() => {
    const defaultFocusedElement = document.querySelector('.ant-select');
    if (defaultFocusedElement) {
      defaultFocusedElement.focus();
    }
  }, []);
  
  return (<Menu id={id} 
    disableAutoFocus 
    pageWrapId={"page-wrap"} 
    outerContainerId={"main-visualization-container"} 
    isOpen={burgerMenuContext.isMenuOpen} 
    onStateChange={state => {burgerMenuContext.stateChangeHandler(state)} }>
    
    <Title level={3} className="white-text text-center sidebar-title">Refina tu búsqueda</Title>

    <Title level={4} className="white-text text-center sidebar-menu-heading">Por tipo de delito</Title>
    <CategoryTree />

    <Title level={4} className="white-text text-center sidebar-menu-heading">Por fecha</Title>
    <DateRangePicker />

    <Title level={4} className="white-text text-center sidebar-menu-heading">Por municipio</Title>
    <MunicipioSelect />

    <div className="lugar-exacto-container align-items-center center-elements text-center">
    <Text className="lugar-exacto-only">Sólo con localización exacta</Text>
    <Switcher style={{ display: "inline-block" }} />
    </div>

    <Button loading={false} icon="AlignJustify" size="small" 
    onClick={() => {
      burgerMenuContext.toggleMenu();
      setShouldUpdate(true);
    }} className="apply-changes-button">
    Aplicar cambios
    </Button>
    
    </Menu>
    );
  };
  
  const BurgerMenu = ({ id }) =>  (<MenuElements id={id} />);
  
  export default BurgerMenu;
  