import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Button, Card } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import { CREATE_PAYOUT_WIRE, API_KEY ,GET_WIRE_PAYOUT_STATUS_WITH_ID_PARAMS} from "../Api";
import { useProvider } from "./context";

export const Payout = () => {
  const { payoutId, setPayoutId } = useProvider();
  const [id,setId] = useState() 
  const [benificiary, setBenificiary] = useState({
    amount: "",
    benificiaryId: "",
  });

  const [circleWalletId,setCircleWalletId] = useState()
  const [payoutStatus,setPayoutStatus] = useState()

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
    };
    await axios.post(`${CREATE_PAYOUT_WIRE}`, data, {
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
     setCircleWalletId(res.data.data.sourceWalletId)
    })
    .catch((err)=>{
     console.log(err,"error create payout side ")
        
    })
    
  }
  //ends

  //createWirePayout
  async function checkPayoutStatus(e) {
    e.preventDefault()

    await axios.get(`${GET_WIRE_PAYOUT_STATUS_WITH_ID_PARAMS}/${id}`, {
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
                
                {/*  */}
                  <div className="row">
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
                        <Button
                          className="me-3"
                          onClick={(e)=>{
                            if(benificiary.benificiaryId && benificiary.amount){
                                createWirePayout(e)
                            }else{
                                window.alert("Enter benificiary details first")
                            }
                          }}
                        >
                          Payout
                        </Button>

                        <label className="me-3" htmlFor="Circle Wallet Id">
                          <Field
                            disabled={true}
                            //   disabled={true}
                            //   name="userName"
                            //   id="username"
                            value={circleWalletId}
                            placeholder="Circle Wallet Id"
                            className="form-control"
                            // onChange ={(e)=>{setBeneficiary(e.target.value.trim())}}
                          />
                        </label>
                        {/* <span>{accountId}</span> */}
                      </div>
                      <div className="mb-3 gap-10">
                        <Button
                          className="me-3"
                          onClick={checkPayoutStatus}
                        >
                          Check current status
                        </Button>
                        <label className="me-3" htmlFor="acc id">
                          <Field
                            //   disabled={true}
                            //   disabled={true}
                            name="payoutId"
                            //   id="username"
                            value={id}
                            placeholder="Enter Payout Id "
                            className="form-control"
                            onChange={(e) => {
                                setId(e.target.value.trim());
                            }}
                          />
                        </label>
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
