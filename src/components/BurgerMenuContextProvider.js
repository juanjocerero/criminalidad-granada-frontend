import React, { useState } from 'react';

export const BurgerMenuContext = React.createContext({});

export const BurgerMenuContextProvider = (props) => {
  const [menuOpenState, setMenuOpenState] = useState(false);

  return (
    <BurgerMenuContext.Provider 
    value={{
      isMenuOpen: menuOpenState,
      toggleMenu: () => {
        setMenuOpenState(!menuOpenState)
      },
      stateChangeHandler: (newState) => {
        setMenuOpenState(newState.isOpen);
      }
    }}>
    { props.children }
    </BurgerMenuContext.Provider>
    );
  };
  