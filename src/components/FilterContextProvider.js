import React, { useState } from 'react';
import { FilterContext, filterContext } from './FilterContext';

export const FilterContextProvider = (props) => {
  const [menuOpenState, setMenuOpenState] = useState(false);
  
  return (
    <FilterContext.Provider 
    value={{
      isMenuOpen: menuOpenState,
      // TODO: all the information needed about every element
      // should have an Object entry here
      toggleMenu: () => {
        setMenuOpenState(!menuOpenState)
      },
      stateChangeHandler: (newState) => {
        setMenuOpenState(newState.isOpen);
      },
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
  