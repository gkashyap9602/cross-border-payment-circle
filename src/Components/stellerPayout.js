import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Button, Card } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import {GET_WIRE_CHIAN_PAYOUT_STATUS_WITH_ID_PARAMS,CREATE_PAYOUT_WIRE_CHAIN,GET_CIRCLE_CHAIN_WALLET_BALANCE_WALLETID_PARAMS, CREATE_PAYOUT_WIRE, API_KEY ,CREATE_CIRCLE_CHAIN_WALLET,CREATE_CIRCLE_CHAIN_ADDRESS_WALLET_ID_PARAMS} from "../Api";
import { useProvider } from "./context";

export const StellerPayout = () => {
  const { stellerDetails,setStellerDetails} = useProvider();

  const [circleChainWalletId,setCircleChainWalletId] = useState("")
  const [circleStellerAccount,setCircleStellerAccount] = useState("")
  const [balanceChainWalletId,setBalanceChainWalletId] = useState("")
  const [circleChainWalletBalance,setCircleChainWalletBalance] = useState()

  const [payoutFromCircleWalletId,setPayoutFromCircleWalletId] = useState()

  const [benificiary, setBenificiary] = useState({
    amount: "",
    benificiaryId: "",
  });
  const [payoutId,setPayoutId] = useState("")
  const [statusPayoutId,setStatusPayoutId] = useState("")
  const [payoutStatus,setPayoutStatus] = useState()
//   const [benificiary, setBenificiary] = useState({
//     amount: "",
//     benificiaryId: "",
//   });

//   const [circleWalletId,setCircleWalletId] = useState()
//   const [payoutStatus,setPayoutStatus] = useState()


//check steller account balance 

const CheckBalance = async ()=> {
    const CheckBalance = await axios.get(
      `https://horizon-testnet.stellar.org/accounts/${stellerDetails.stellerAccount}`
    );
    console.log(CheckBalance,"Steller Acc check Balance");
    setStellerDetails({
        ...stellerDetails,
        stellerBalance: CheckBalance?.data?.balances[0]?.balance,
      });
  };
  //ends 



  //
  async function createCircleWalletAndAddress(e) {
    e.preventDefault()

    let uniqName = uuidv4()
    let data = {
      idempotencyKey: uuidv4(),
      description: `Chain Wallet ${uniqName}`,
    };
    await axios.post(`${CREATE_CIRCLE_CHAIN_WALLET}`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    })
    .then((res)=>{
     console.log(res,"response create circle chain Wallet side ")
     setCircleChainWalletId(res.data.data.walletId)
       
     if(res.data.data.walletId){

        let formdata = {
            idempotencyKey: uuidv4(),
            currency: "USD",
            chain: "ETH"
        }
        axios.post(`${CREATE_CIRCLE_CHAIN_ADDRESS_WALLET_ID_PARAMS}/${res.data.data.walletId}/addresses`, formdata, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${API_KEY}`,
            },
          })
          .then((res)=>{
            console.log(res,"response create circle steller Acc side")
            window.alert("account Created Successfully")
            setCircleStellerAccount(res.data.data.address)

          }).catch((err)=>{
            console.log(err,"error create circle steller acc side")
          })
     }
     
    })
    .catch((err)=>{
     console.log(err,"error create payout side ")
        
    })
    
  }
  //ends

  async function getCircleChainWalletBalance(e) {
    e.preventDefault()

    await axios.get(`${GET_CIRCLE_CHAIN_WALLET_BALANCE_WALLETID_PARAMS}/${balanceChainWalletId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    })
    .then((res)=>{
     console.log(res,"response  get circle chain wallet balance side ")
     console.log(res.data.data.balances,"response  get circle chain wallet balance side ")

     if(res.data.data.balances.length>0){
        let usdc = res.data.data.balances.find((val)=>val.currency ==="USD")

            setCircleChainWalletBalance(usdc?.amount? usdc.amount:0)

     }else{
        setCircleChainWalletBalance(0)
     }
     
    })
    .catch((err)=>{
     console.log(err,"error payout status side ")
        
    })
    
  };

  //dd

  async function createWirePayout(e) {
    e.preventDefault()

    let data = {
      idempotencyKey: uuidv4(),
      destination: {
        type: "wire",
        id: benificiary.benificiaryId,
      },
      amount: {
        amount: benificiary.amount,
        currency: "USD",
      },
      metadata: {
        beneficiaryEmail: "satoshi@circle.com"
   },
   source: {
    type: "wallet",
    id: payoutFromCircleWalletId
},
    };
    await axios.post(`${CREATE_PAYOUT_WIRE_CHAIN}`, data, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    })
    .then((res)=>{
     console.log(res,"response create payout side ")
     window.alert("Payout Successfull Check Status")
     setPayoutId(res.data.data.id)
    })
    .catch((err)=>{
     console.log(err,"error create payout side ")
        
    })
    
  }

  async function checkPayoutStatus(e) {
    e.preventDefault()

    await axios.get(`${GET_WIRE_CHIAN_PAYOUT_STATUS_WITH_ID_PARAMS}/${statusPayoutId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    })
    .then((res)=>{
     console.log(res,"response  payout status side ")
     setPayoutStatus(res.data.data.status)
    })
    .catch((err)=>{
     console.log(err,"error payout status side ")
        
    })
    
  }
  //ends
  //ends
//   async function checkPayoutStatus(e) {
//     e.preventDefault()

//     await axios.get(`${GET_WIRE_PAYOUT_STATUS_WITH_ID_PARAMS}/${id}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${API_KEY}`,
//       },
//     })
//     .then((res)=>{
//      console.log(res,"response  payout status side ")
//      setPayoutStatus(res.data.data.status)
//     })
//     .catch((err)=>{
//      console.log(err,"error payout status side ")
        
//     })
    
//   }
  //ends

  console.log(circleChainWalletBalance,"circleChainWalletBalance")
  return (
    <>
      <div className="main page-content">
        <Card>
          <Card.Body>
            <Formik
              //   initialValues={user}
              enableReinitialize
              //   validationSchema={ProfileSchema}
              //   onSubmit={updateProfile}
            >
              {({ errors, touched }) => (
                <Form>
                {/* 1 */}
                <div className="row">
                <strong className="mb-4">Steller Account</strong>

                    <div className="col-md-12">
                      {/* <div>WirePayment</div> */}

                      <div className="mb-3 gap-10">
                        <label className="me-3" htmlFor="stellerAccount">
                          <Field
                            //   disabled={true}
                            //   disabled={true}
                            name="stellerAccount"
                            //   id="username"
                            value={stellerDetails.stellerAccount}
                            placeholder="Enter Steller Account "
                            className="form-control"
                            onChange={(e) => {
                                setStellerDetails({
                                ...stellerDetails,
                                stellerAccount: e.target.value,
                              });
                            }}
                          />
                        </label>
                       
                        <Button
                          className="me-3"
                          onClick={(e)=>{
                            if(stellerDetails.stellerAccount){
                                CheckBalance(e)
                            }else{
                                window.alert("Enter Steller Account First")
                            }
                          }}
                        >
                          Get Balance
                        </Button>

                       
                        {/* <span>{accountId}</span> */}
                      </div>
                      <div className="mb-3 gap-10">
                        <Button
                          className="me-3"
                          onClick={createCircleWalletAndAddress}
                        >
                          Create Circle Steller Account
                        </Button>
                        <label className="me-3" htmlFor="acc id">
                          <Field
                              disabled={true}
                            //   disabled={true}
                            name="circleChainWalletId"
                            //   id="username"
                            value={circleChainWalletId}
                            placeholder="Circle Chain Wallet Id"
                            className="form-control"
                            onChange={(e) => {
                                setCircleChainWalletId(e.target.value.trim());
                            }}
                          />
                        </label>

                        <span> <strong>Circle Steller Account</strong>:-{circleStellerAccount}</span>
                        {/* <label className="me-3" htmlFor="acc id">
                          <Field
                              disabled={true}
                            //   disabled={true}
                            name="circleStellerAccount"
                            //   id="username"
                            value={circleStellerAccount}
                            placeholder="Circle Steller Account"
                            className="form-control"
                            onChange={(e) => {
                                setCircleStellerAccount(e.target.value.trim());
                            }}
                          />
                        </label> */}
                        
                        {/* <span>{payoutStatus}</span> */}
                      </div>
                      
                      {/* <div className="mb-3 gap-10">
                        <Button className="me-3" onClick={getWireInstruction}>
                          Get Circle Account number
                        </Button>
                      </div> */}
                    </div>
                  </div>

                  {/* 2 */}
                  <div className="row">
                <strong className="mb-4">Transfer</strong>

                    <div className="col-md-12">
                      {/* <div>WirePayment</div> */}

                      <div className="mb-3 gap-10">
                      <label className="me-3" htmlFor="circleStellerAccount">
                          <Field
                            //   disabled={true}
                            //   disabled={true}
                            name="orignalStellerAccount"
                            //   id="username"
                            // value={benificiaryDetails.benificiary}
                            placeholder="orignal Steller Account"
                            className="form-control"
                            // onChange={(e) => {
                            //   setBenificiary({
                            //     ...benificiary,
                            //     benificiaryId: e.target.value,
                            //   });
                            // }}
                          />
                        </label>
                        <label className="me-3" htmlFor="circleStellerAccount">
                          <Field
                            //   disabled={true}
                            //   disabled={true}
                            name="circleStellerAccount"
                            //   id="username"
                            // value={benificiaryDetails.benificiary}
                            placeholder="Circle Steller Account"
                            className="form-control"
                            // onChange={(e) => {
                            //   setBenificiary({
                            //     ...benificiary,
                            //     benificiaryId: e.target.value,
                            //   });
                            // }}
                          />
                        </label>
                        <label className="me-3" htmlFor="usdcAmount">
                          <Field
                            //   disabled={true}
                            //   disabled={true}
                            name="usdcAmount"
                            //   id="username"
                            // value={benificiaryDetails.amount}
                            placeholder="Enter amount USDC"
                            className="form-control"
                            // onChange={(e) => {
                            //   setBenificiary({
                            //     ...benificiary,
                            //     amount: e.target.value,
                            //   });
                            // }}
                          />
                        </label>
                        <Button
                          className="me-3"
                        //   onClick={(e)=>{
                        //     if(benificiary.benificiaryId && benificiary.amount && payoutFromCircleWalletId){
                        //         createWirePayout(e)
                        //     }else{
                        //         window.alert("Enter benificiary details first")
                        //     }
                        //   }}
                        >
                          Transfer
                        </Button>

                        {/* <span>{accountId}</span> */}
                      </div>
                      <div className="mt-3">
                      <strong className="mb-4">Check Circle Wallet Balance </strong>
                      <div className="mb-3 mt-3">
                      <label className="me-3" htmlFor="acc id">
                          <Field
                            //   disabled={true}
                            //   disabled={true}
                            name="circleChainId"
                            //   id="username"
                            value={balanceChainWalletId}
                            placeholder="Enter Circle Chain Wallet Id "
                            className="form-control"
                            onChange={(e) => {
                                setBalanceChainWalletId(e.target.value.trim());
                            }}
                          />
                        </label>
                        <Button
                          className="me-3"
                          onClick={(e)=>{
                            if(balanceChainWalletId){
                                getCircleChainWalletBalance(e)
                            }else{
                                window.alert("enter circle chain wallet id first")
                            }
                          }}
                        >
                          Get Circle Chain Wallet Balance 
                        </Button>
                        <label className="me-3" htmlFor="acc id">
                          <Field
                              disabled={true}
                            //   disabled={true}
                            name="circleChainWalletBalance"
                            //   id="username"
                            value={`${circleChainWalletBalance} USD`}
                            placeholder="circle Chain USDC Balance"
                            className="form-control"
                            // onChange={(e) => {
                            //     setId(e.target.value.trim());
                            // }}
                          />
                        </label>
                        {/* <span>{payoutStatus}</span> */}
                      </div>
                      </div>
                      
                      {/* <div className="mb-3 gap-10">
                        <Button className="me-3" onClick={getWireInstruction}>
                          Get Circle Account number
                        </Button>
                      </div> */}
                    </div>
                  </div>
                {/* 3 */}
                  <div className="row">
                <strong className="mb-4">Payout</strong>

                    <div className="col-md-12">
                      {/* <div>WirePayment</div> */}

                      <div className="mb-3 gap-10">
                        <label className="me-3" htmlFor="benificiary">
                          <Field
                            //   disabled={true}
                            //   disabled={true}
                            name="benificiaryId"
                            //   id="username"
                            // value={benificiaryDetails.benificiary}
                            placeholder="Enter Wire Bank Id "
                            className="form-control"
                            onChange={(e) => {
                              setBenificiary({
                                ...benificiary,
                                benificiaryId: e.target.value,
                              });
                            }}
                          />
                        </label>
                        <label className="me-3" htmlFor="amount">
                          <Field
                            //   disabled={true}
                            //   disabled={true}
                            name="amount"
                            //   id="username"
                            // value={benificiaryDetails.amount}
                            placeholder="Enter amount"
                            className="form-control"
                            onChange={(e) => {
                              setBenificiary({
                                ...benificiary,
                                amount: e.target.value,
                              });
                            }}
                          />
                        </label>
                        <label className="me-3" htmlFor="Circle Wallet Id">
                          <Field
                            // disabled={true}
                            //   disabled={true}
                            //   name="userName"
                            //   id="username"
                            value={payoutFromCircleWalletId}
                            placeholder="Enter Circle Chain Wallet Id"
                            className="form-control"
                            onChange ={(e)=>{setPayoutFromCircleWalletId(e.target.value.trim())}}
                          />
                        </label>
                        <Button
                          className="me-3"
                          onClick={(e)=>{
                            if(benificiary.benificiaryId && benificiary.amount && payoutFromCircleWalletId){
                                createWirePayout(e)
                            }else{
                                window.alert("Enter benificiary details first")
                            }
                          }}
                        >
                          Payout
                        </Button>

                       
                        <span>{payoutId}</span>
                      </div>
                      <div className="mb-3 gap-10">
                      <label className="me-3" htmlFor="acc id">
                          <Field
                            //   disabled={true}
                            name="statusPayoutId"
                            //   id="username"
                            value={statusPayoutId}
                            placeholder="Enter Payout Id "
                            className="form-control"
                            onChange={(e) => {
                                setStatusPayoutId(e.target.value.trim());
                            }}
                          />
                        </label>
                        <Button
                          className="me-3"
                          onClick={(e)=>{
                            if(statusPayoutId){
                                checkPayoutStatus(e)
                            }else{
                                window.alert("enter status payout id first ")
                            }
                          }}
                        >
                          Check Payout status
                        </Button>
                        
                        <span>{payoutStatus}</span>
                      </div>
                      {/* <div className="mb-3 gap-10">
                        <Button className="me-3" onClick={getWireInstruction}>
                          Get Circle Account number
                        </Button>
                      </div> */}
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
