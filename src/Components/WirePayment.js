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
  GET_WIRE_TRANSFER_STATUS_PARAMS
} from "../Api";
import { useProvider } from "./context";
import { CreateAccountModal } from "./Modal/CreateAccountModal";

export const WirePayment = (props) => {
  const { setWireAccountId } = useProvider();
  const [accountId, setAccountId] = useState("");
  const [cirecleAccountNumber, setCircleAccountNumber] = useState("");
  const [trackingId, setTrackingId] = useState("");

  const [benificiaryDetails,setBeneficiaryDetails] = useState({
    benificiary:"",
    amount:""
  })

  const [accStatus, setAccStatus] = useState();
  const [data, setData] = useState({
    // amount: "",
    trackRef: "",
    benificiary: "",
  });
  // const [amount, setAmount] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  //========
  const [data2, setData2] = useState({
    idempotencyKey: uuidv4(),
    accountNumber: "12340010",
    routingNumber: "121000248",
    name: "Satoshi Nakamoto",
    city: "Boston",
    countryCode: "US",
    address: "100 Money Street",
    postal: "01234",
    district: "MA",
    bankCountryCode: "US",
    bankName: "SAN FRANCISCO",
    bankCity: "SAN FRANCISCO",
    bankAddress: "100 Money Street",
    bankdistrict: "CA",
  });

  async function createWireAccount(e) {
    e.preventDefault()

    console.log(data2,"data2-=-=-=")
    let data = {
      idempotencyKey: uuidv4(),
      accountNumber: data2.accountNumber,
      routingNumber: data2.routingNumber,
      billingDetails: {
        name: data2.name,
        city: data2.city,
        country: data2.countryCode,
        line1: data2.address,
        postalCode: data2.postal,
        line2: "Suite 1",
        district: data2.district,
      },
      bankAddress: {
        country: data2.bankCountryCode,
        bankName: data2.bankName,
        city: data2.bankCity,
        line1: data2.bankAddress,
        line2: "Suite 1",
        district: data2.bankdistrict,
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
        setShow2(false);
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

   //send on chain
  async function sendOnChain(){
    const baseUrl = "https://api-sandbox.circle.com";

    const WalletId= await axios.get(`${baseUrl}/v1/configuration`,{
        headers: {
            'Content-Type': 'application/json',
             Accept:'application/json',
            'Authorization' : `Bearer ${API_KEY}`,
         } })
         console.log(WalletId,"response get wallet Id");
         console.log(WalletId.data.data.payments.masterWalletId,"Here is the master wallet Id");
         const Wallet_Id = WalletId.data.data.payments.masterWalletId

    const chainData={
        "idempotencyKey": uuidv4() ,
        "source": {
          "type": "wallet",
          "id": Wallet_Id
        },
        "destination": {
          "type": "blockchain",
          "address": benificiaryDetails.benificiary.trim(),
          "chain": "XLM"
        },
        "amount": {
          "amount": benificiaryDetails.amount,
          "currency": "USD"
        }
      }

      if(Wallet_Id){
        const chainPayload= await axios.post(`${baseUrl}/v1/transfers`,chainData,{
          headers: {
              'Content-Type': 'application/json',
              Accept:'application/json',
              'Authorization' :  `Bearer ${API_KEY}`,
           } }) 
           window.alert("Transfer on chain successfully ")
           console.log(chainPayload,"Transferred on chain successfully ")
      }
  
};
//ends here


  async function sendWireTransaction(e) {
    try {
      e.preventDefault();
      const Payload = {
        trackingRef: trackingId,
        amount: {
          amount: benificiaryDetails.amount,
          currency: "USD",
        },
        beneficiaryBank: {
          accountNumber: data.benificiary,
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
      console.log(wireTransaction, "response deposite transfer api ");

      sendOnChain()
      // window.alert("Deposite Transaction Successfull");

      

    } catch (error) {
      console.log(error, "error send wire trans side ");
    } finally {
      setShow(false);
    }
  }

  //   console.log(data,"data--wire pay side")
  return (
    <>
      <CreateAccountModal
        data={data2}
        setData={setData2}
        show={show2}
        setShow={setShow2}
        createWireAccount={createWireAccount}
      />
      <WirePaymentModal
        data={data}
        benificiaryDetails={benificiaryDetails}
        setBeneficiaryDetails = {setBeneficiaryDetails}
        setData={setData}
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
                      <label className="me-3" htmlFor="benificiary">
                          <Field
                            //   disabled={true}
                            //   disabled={true}
                            name="benificiary"
                            //   id="username"
                            value={benificiaryDetails.benificiary}
                            placeholder="Enter benificiary address"
                            className="form-control"
                            onChange={(e) => {
                              setBeneficiaryDetails({...benificiaryDetails,benificiary:e.target.value});

                            }}
                          />
                        </label>
                        <label className="me-3" htmlFor="amount">
                          <Field
                            //   disabled={true}
                            //   disabled={true}
                            name="amount"
                            //   id="username"
                            value={benificiaryDetails.amount}
                            placeholder="Enter amount"
                            className="form-control"
                            onChange={(e) => {
                              setBeneficiaryDetails({...benificiaryDetails,amount:e.target.value});
                            }}
                          />
                        </label>
                        <Button className="me-3" onClick={() => setShow2(true)}>
                          Transfer
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
                            placeholder="Wire Bank Account Id "
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
                      {/* <label className="me-3" htmlFor="benificiary">
                          <Field
                            //   disabled={true}
                            //   disabled={true}
                            name="benificiary"
                            //   id="username"
                            value={benificiaryDetails.benificiary}
                            placeholder="Enter benificiary address"
                            className="form-control"
                            onChange={(e) => {
                              setBeneficiaryDetails({...benificiaryDetails,benificiary:e.target.value});

                            }}
                          />
                        </label>
                        <label className="me-3" htmlFor="amount">
                          <Field
                            //   disabled={true}
                            //   disabled={true}
                            name="amount"
                            //   id="username"
                            value={benificiaryDetails.amount}
                            placeholder="Enter amount"
                            className="form-control"
                            onChange={(e) => {
                              setBeneficiaryDetails({...benificiaryDetails,amount:e.target.value});
                            }}
                          />
                        </label> */}
                        <Button className="me-3" onClick={() => {
                          if(benificiaryDetails.amount && benificiaryDetails.benificiary){
                            setShow(true)

                          }else{
                            window.alert("Please Enter benoficiary details first")
                          }
                          
                          }}>
                          Create Mock Wire Payment
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
