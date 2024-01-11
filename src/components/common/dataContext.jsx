import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [itemsValue, setItemsValue] = useState(10);

  const updateItemsValue = (newValue) => {
    setItemsValue(newValue);
  };

  const [pokeTags, setPokeTags] = useState([]);

  const updatePokeTags = (newValue) => {
    setPokeTags(newValue);
    setItemsValue((prevItems) => ({ ...prevItems }));
  }

  return (
    <DataContext.Provider value={{ itemsValue, pokeTags, updatePokeTags,  updateItemsValue }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};