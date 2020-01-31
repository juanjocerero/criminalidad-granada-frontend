import React, { useContext, useEffect, useRef } from 'react';
import { scaleRotate as Menu } from 'react-burger-menu';

import CategoryTree from './CategoryTree';
import DateRangePicker from './DatePicker';
import Button from '@bit/ans.base-ui.button';
import AutoCompleter from './AutoCompleter';
import Switcher from './Switcher';
import { Typography } from 'antd';

import { QueryContext } from './QueryContext';
import { BurgerMenuContext } from './BurgerMenuContextProvider';

import '../css/BurgerMenu.scss';
import '../css/common.scss';

const { Title, Text } = Typography;

const MenuElements = ({id}) => {
  const burgerMenuContext = useContext(BurgerMenuContext);
  const { stateCategories, stateSelectedCategories, stateShouldUpdate } = useContext(QueryContext);

  const [categories, setCategories] = stateCategories;
  const [selectedCategories, setSelectedCategories] = stateSelectedCategories;
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
  
  // TODO: Every componen introduced between the Menu and the final Apply Changes Button
  // should put its current value into the State object via setState().
  // We can then pass it up to the Context object, which will trigger the upper
  // CrimeVisualizationComponent with a change to the queryUrl parameter
  // that will fire up an useEffect() that updates the view on the map.
  // https://www.youtube.com/watch?v=6uBgda52yEo
  
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
    <AutoCompleter />

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
  