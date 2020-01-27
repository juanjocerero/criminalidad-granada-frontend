import React, { useContext, useState, useEffect, useRef } from 'react';
import { scaleRotate as Menu } from 'react-burger-menu';
import Button from '@bit/ans.base-ui.button';

import { QueryContext } from './QueryContext';
import { BurgerMenuContext } from './BurgerMenuContextProvider';

import { fetchApiEndpoint } from './CrimeVisualization';

import '../css/BurgerMenu.scss';

const MenuElements = ({id}) => {
  const burgerMenuContext = useContext(BurgerMenuContext);
  const { stateFields } = useContext(BurgerMenuContext);
  
  const { stateCategorias, stateMunicipios, stateCuerpos } = useContext(QueryContext);
  const [categorias, setCategorias] = stateCategorias;
  const [municipios, setMunicipios] = stateMunicipios;
  const [cuerpos, setCuerpos] = stateCuerpos;
  
  const closeButtonRef = useRef();
  useEffect(() => {
    const closeButton = document.querySelector('.bm-cross-button button');
    closeButton.addEventListener('click', () => {
      
      // TODO: This should do something with the QueryContext 
      // only if the values provided by the components themselves are outdated
      
      console.log(categorias, municipios, cuerpos);
      
    });
    
    closeButtonRef.current = closeButton;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    async function fetchCategories() {
      const queryResponse = await fetchApiEndpoint(`${process.env.REACT_APP_API_ENDPOINT}/cats`);
      
      if (!queryResponse.error) {
        setCategorias(Array.from(queryResponse.data));
      } else {
        // FIXME: add some kind of error handling
        console.error('error handling categories from api');
      }
    };
    fetchCategories();
  }, []);
  
  // TODO: Every componen introduced between the Menu and the final Apply Changes Button
  // should put its current value into the State object via setState().
  // We can then pass it up to the Context object, which will trigger the upper
  // CrimeVisualizationComponent with a change to the queryUrl parameter
  // that will fire up an useEffect() that updates the view on the map.
  // https://www.youtube.com/watch?v=6uBgda52yEo
  
  return (<Menu id={id} 
    pageWrapId={"page-wrap"} 
    outerContainerId={"main-visualization-container"} 
    isOpen={burgerMenuContext.isMenuOpen} 
    onStateChange={state => {burgerMenuContext.stateChangeHandler(state)} }>
    
    <Button loading={false} icon="AlignJustify" size="small" 
    onClick={burgerMenuContext.toggleMenu} className="apply-changes-button">
    Aplicar cambios
    </Button>
    
    {
      categorias.map(categoria => {
        console.log(categoria);
        return (<div key={categoria._id}>{ categoria.nombre }</div>)
      })
    }
    
    </Menu>
    );
  };
  
  const BurgerMenu = ({ id }) =>  (<MenuElements id={id} />);
  
  export default BurgerMenu;
  