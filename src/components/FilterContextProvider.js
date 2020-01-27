import React, { useState } from 'react';
import { FilterContext, filterContext } from './FilterContext';

export const FilterContextProvider = (props) => {
  const [menuOpenState, setMenuOpenState] = useState(false);
  // TODO: all the variables are declared here to be passed around
  // using the same syntax as the above declaration.
  // Then they are all declared in pairs as value of the keys
  // that will later be retrieved by other components

  const [categorias, setCategorias] = useState([]);
  
  return (
    <FilterContext.Provider 
    value={{
      // The next two functions are only related to react-burger-menu.
      isMenuOpen: menuOpenState,
      toggleMenu: () => {
        setMenuOpenState(!menuOpenState)
      },
      stateChangeHandler: (newState) => {
        setMenuOpenState(newState.isOpen);
      },

      // My logic starts here
      // TODO: all the information needed about every element
      // should have an Object entry here
      // https://www.youtube.com/watch?v=6uBgda52yEo (16:45)
      // Then we can call the set Methods either from the onChange
      // event of each component or during the handleSidebarChanges()

      categorias: [categorias,setCategorias],

      handleSidebarChanges: (state) => {
        if (state.shouldUpdateQueries) {
          // TODO: Here we update the state of the main map...
          // This should just read the object passed up from the BurgerMenu event
          // and store it in a variable in the global scope
          // that gets read and acted upon by a useEffect on the 
          // CrimeVisualization component.
          // https://www.youtube.com/watch?v=6uBgda52yEo
          console.log('Handle logic event');
        }
      },
      // TODO: check if this actually works by debugging the component
      ...filterContext 
    }}>
    { props.children }
    </FilterContext.Provider>
    );
  };
  