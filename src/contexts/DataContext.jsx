import React, { createContext } from "react";

export const DataContext = createContext();

const Provider = ({ children }) => {
  
  return (
    <div>
      <DataContext.Provider>{children}</DataContext.Provider>
    </div>
  );
};

export default Provider;
