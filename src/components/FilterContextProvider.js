import React, { useState } from 'react';
import { FilterContext } from './FilterContext';

export const FilterContextProvider = (props) => {
  const [menuOpenState, setMenuOpenState] = useState(false);
  
  return (
    <FilterContext.Provider 
    value={{
      isMenuOpen: menuOpenState,
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
          console.log('Handle logic event');
        }
      }
    }}>
    { props.children }
    </FilterContext.Provider>
    );
  };
  