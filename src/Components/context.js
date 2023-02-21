import React, { createContext, useState, useContext } from "react";

export const GlobalNftContext = createContext();

export const ProviderApp = ({ children }) => {
  const [data, setData] = useState("");

  const [accountAddress, setAccountAddress] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);
  const [show,setShow] = useState(false)


  return (
    <GlobalNftContext.Provider
      value={{
        data,
        setData,
        accountAddress,
        setAccountAddress,
        beneficiary,
        setBeneficiary,
        accountBalance,
        setAccountBalance,
        setShow,
        show
      }}
    >
      {children}
    </GlobalNftContext.Provider>
  );
};
export function useProvider() {
  return useContext(GlobalNftContext);
}
