import React, { createContext, useState, useContext } from "react";

export const GlobalNftContext = createContext();

export const ProviderApp = ({ children }) => {
  const [data, setData] = useState("");

  const [accountAddress, setAccountAddress] = useState("");


  return (
    <GlobalNftContext.Provider
      value={{
        data,
        setData,
        accountAddress,
        setAccountAddress
      }}
    >
      {children}
    </GlobalNftContext.Provider>
  );
};
export function useProvider() {
  return useContext(GlobalNftContext);
}
