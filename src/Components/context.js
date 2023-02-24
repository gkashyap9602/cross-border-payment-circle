import React, { createContext, useState, useContext } from "react";

export const GlobalNftContext = createContext();

export const ProviderApp = ({ children }) => {
  const [data, setData] = useState("");

  const [accountAddress, setAccountAddress] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);
  const [show,setShow] = useState(false)

  const [WireAccountId,setWireAccountId] = useState("")
  const [payoutId,setPayoutId] = useState("")

  
  const [stellerDetails,setStellerDetails] = useState({
    stellerAccount:"",
    stellerBalance:""
}) 

  return (
    <GlobalNftContext.Provider
      value={{
        stellerDetails,
        setStellerDetails,
        setPayoutId,
        payoutId,
        data,
        setData,
        accountAddress,
        setAccountAddress,
        beneficiary,
        setBeneficiary,
        accountBalance,
        setAccountBalance,
        setShow,
        show,
        setWireAccountId,
        WireAccountId
      }}
    >
      {children}
    </GlobalNftContext.Provider>
  );
};
export function useProvider() {
  return useContext(GlobalNftContext);
}
