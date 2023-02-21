import React, { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { WirePaymentModal } from "./Modal/WirePaymentModal";
import { Button, Card } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import {
  CREATE_WIRE_MOCK_PAYMENT_API,
  API_KEY,
  CREATE_WIRE_ACCOUNT,
  GET_WIRE_ACC_STATUS_WITH_ID_PARAMS,
  GET_CIRCLE_ACCOUNT_PRAMS,
} from "../Api";
import { useProvider } from "./context";

export const WirePayment = (props) => {
  const { setWireAccountId } = useProvider();
  const [accountId, setAccountId] = useState("");
  const [cirecleAccountNumber, setCircleAccountNumber] = useState("");
  const [trackingId, setTrackingId] = useState("");

  const [accStatus, setAccStatus] = useState();
  // const [data,setData] = useState({
  //     amount:"",
  //     trackRef:"",
  //     benificiary:""
  // })
  const [amount, setAmount] = useState("");
  const [show, setShow] = useState(false);

  async function createWireAccount() {
    let data = {
      idempotencyKey: uuidv4(),
      accountNumber: "12340010",
      routingNumber: "121000248",
      billingDetails: {
        name: "Satoshi Nakamoto",
        city: "Boston",
        country: "US",
        line1: "100 Money Street",
        postalCode: "01234",
        line2: "Suite 1",
        district: "MA",
      },
      bankAddress: {
        country: "US",
        bankName: "SAN FRANCISCO",
        city: "SAN FRANCISCO",
        line1: "100 Money Street",
        line2: "Suite 1",
        district: "CA",
      },
    };
    // console.log(newWireAccount);
    await axios
      .post(`${CREATE_WIRE_ACCOUNT}`, data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: ` Bearer ${API_KEY}`,
        },
      })

      .then(async (res) => {
        console.log(res, "response create wire acc sid e");

        console.log(res.data.data.id, "New Wire Account created successfully ");
        window.alert("New Wire Account Created Successfully");
        setAccountId(res.data.data.id);
        setWireAccountId(res.data.data.id);
        setTrackingId(res.data.data.trackingRef);
        await getWireInstruction(res.data.data.id);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }
  async function getWireAccountStatus() {
    console.log(accountId);
    const data = await axios.get(
      `${GET_WIRE_ACC_STATUS_WITH_ID_PARAMS}/${accountId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    window.alert("Wire Account Status", data.data.data.status.toString());
    setAccStatus(data.data.data.status);
    console.log(data, "current status");
  }

  async function getWireInstruction(_accountId) {
    const payload = await axios.get(
      `${GET_CIRCLE_ACCOUNT_PRAMS}/${_accountId}/instructions`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    console.log(payload, "response Get wire instruction data");
    console.log(
      payload.data.data.beneficiaryBank.accountNumber,
      "circle acc number"
    );
    setCircleAccountNumber(payload.data.data.beneficiaryBank.accountNumber);
  }

  async function sendWireTransaction(e) {
    try {
      e.preventDefault();
      const Payload = {
        trackingRef: trackingId,
        amount: {
          amount: amount,
          currency: "USD",
        },
        beneficiaryBank: {
          accountNumber: cirecleAccountNumber,
        },
      };
      const wireTransaction = await axios.post(
        `${CREATE_WIRE_MOCK_PAYMENT_API}`,
        Payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: ` Bearer ${API_KEY}`,
          },
        }
      );
      window.alert("Transaction Successfull");
      console.log(wireTransaction, "Send 10 USD successfully");
    } catch (error) {
      console.log(error, "error send wire trans side ");
    } finally {
      setShow(false);
    }
  }

  //   console.log(data,"data--wire pay side")
  return (
    <>
      <WirePaymentModal
        setAmount={setAmount}
        amount={amount}
        trackingId={trackingId}
        setTrackingId={setTrackingId}
        cirecleAccountNumber={cirecleAccountNumber}
        setCircleAccountNumber={setCircleAccountNumber}
        show={show}
        setShow={setShow}
        sendWireTransaction={sendWireTransaction}
      />
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
                  <div className="row">
                    <div className="col-md-12">
                      {/* <div>WirePayment</div> */}

                      <div className="mb-3 gap-10">
                        <Button className="me-3" onClick={createWireAccount}>
                          Create Account
                        </Button>
                        <label className="me-3" htmlFor="Beneficiary Account">
                          <Field
                            disabled={true}
                            //   disabled={true}
                            //   name="userName"
                            //   id="username"
                            value={trackingId}
                            placeholder="Tracking Reference"
                            className="form-control"
                            // onChange ={(e)=>{setBeneficiary(e.target.value.trim())}}
                          />
                        </label>
                        <label className="me-3" htmlFor="Circle Account Number">
                          <Field
                            disabled={true}
                            //   disabled={true}
                            //   name="userName"
                            //   id="username"
                            value={cirecleAccountNumber}
                            placeholder="Circle Account Number"
                            className="form-control"
                            // onChange ={(e)=>{setBeneficiary(e.target.value.trim())}}
                          />
                        </label>
                        {/* <span>{accountId}</span> */}
                      </div>
                      <div className="mb-3 gap-10">
                        <Button className="me-3" onClick={getWireAccountStatus}>
                          Check current status
                        </Button>
                        <label className="me-3" htmlFor="acc id">
                          <Field
                            //   disabled={true}
                            //   disabled={true}
                            name="accountId"
                            //   id="username"
                            value={accountId}
                            placeholder="Enter Bank Account Id "
                            className="form-control"
                            onChange={(e) => {
                              setAccountId(e.target.value.trim());
                            }}
                          />
                        </label>
                        <span>{accStatus}</span>
                      </div>
                      {/* <div className="mb-3 gap-10">
                        <Button className="me-3" onClick={getWireInstruction}>
                          Get Circle Account number
                        </Button>
                      </div> */}
                      <div className="mb-3 gap-10">
                        <Button className="me-3" onClick={() => setShow(true)}>
                          SendWireTransaction
                        </Button>
                      </div>
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
