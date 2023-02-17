import React, { createContext, useState, useContext } from "react";

export const GlobalNftContext = createContext();

export const ProviderApp = ({ children }) => {
  const [data, setData] = useState("");

  return (
    <GlobalNftContext.Provider
      value={{
        data,
        setData,
      }}
    >
      {children}
    </GlobalNftContext.Provider>
  );
};
export function useProvider() {
  return useContext(GlobalNftContext);
}
