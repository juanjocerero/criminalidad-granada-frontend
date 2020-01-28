import React, { useState } from 'react';

import { QueryContext } from './QueryContext';

const QueryContextProvider = props => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <QueryContext.Provider value={{
      stateCategories: [categories, setCategories],
      stateSelectedCategories: [selectedCategories, setSelectedCategories]
    }}>
      { props.children }
    </QueryContext.Provider>
  );
};

export default QueryContextProvider;
