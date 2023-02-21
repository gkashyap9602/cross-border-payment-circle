import React, { useState } from "react";
import "./home.css";
import { Field, Form, Formik } from "formik";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import StellarSdk, {
  TransactionBuilder,
  BASE_FEE,
  Operation,
  Asset,
  Keypair,
} from "stellar-sdk";
import { useProvider } from "./context";

import { CardPayment } from "./Modal/CardPayment";
import { encrypt } from "openpgp";

import { API_BASE_URL } from "../Api";
// const StellarSdk = require('stellar-sdk');
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org/");

export const Home = (props) => {
    const {show,setShow,setAccountAddress,accountAddress,setBeneficiary,beneficiary,accountBalance, setAccountBalance}  = useProvider()

    // const [show,setShow] = useState(false)

  // const [accountBalance, setAccountBalance] = useState(0);
  // const [anchorAddress, setAnchorAddress] = useState("");

  // const [beneficiary, setBeneficiary] = useState("");


  async function createAccount() {
    const pair1 = StellarSdk.Keypair.random();
    const _Address = pair1.publicKey();
    setAccountAddress(_Address);
    console.log(_Address, "Destination Public key (destination address)");
    const privatekey = pair1.secret();
    console.log(privatekey, " Destination Secret key");
    localStorage.setItem("PrivateKey", privatekey); //storing privateKey to loacl storage ********************************
    const response = await axios.get(
      `https://friendbot.stellar.org/?addr=${_Address}`
    );
    console.log(response, "response>>>>>>>>>>>>>>>>>>>");
    await CheckBalance(_Address);
  }

  const CheckBalance = async (accountAddress)=> {
    const CheckBalance = await axios.get(
      `https://horizon-testnet.stellar.org/accounts/${accountAddress}`
    );
    console.log(
      CheckBalance,
      ".....................................for payment...."
    );
    setAccountBalance(CheckBalance?.data?.balances[0]?.balance);
  }


  //build trustline
  async function BuildTrustLIne() {
    const secret = localStorage.getItem("PrivateKey");
    const keypair = Keypair.fromSecret(secret);
    const networkUrl = "https://horizon-testnet.stellar.org/";
    const assetCode = "USDC";
    const server = new StellarSdk.Server(networkUrl);
    const issuingAccount = "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5"; // Circle Anchor testnet Address :"GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5"

    const account = await server.loadAccount(accountAddress);

    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(
        Operation.changeTrust({
          asset: new Asset(assetCode, issuingAccount),
          limit: "100000",
        })
      )
      .setTimeout(0)
      .build();

    await transaction.sign(keypair);

    const result = await server.submitTransaction(transaction);
    console.log(result);
    window.alert("TrustLine Build Successfully")
    console.log("TrustLine Build Successfully");

    return result;
  };
  //ends here 

  

  return (<>
    <CardPayment show={show} setShow = {setShow} />

    <div className="main page-content">

      <Card>
        <Card.Body>
          <div className="">
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
                    <div className="mb-3 gap-10">
                     <Button className="me-3" onClick={createAccount}>Create Account</Button>
                      {/* <span>{accountAddress}</span> */}
                      <Button className="me-3" onClick={BuildTrustLIne}>
                          Build TrustLine
                        </Button>
                     </div>
                      {/* <div className="mb-3 gap-10">
                        
                        <label  className="me-3" htmlFor="create">
                          <Field
                            disabled={true}
                            //   name="userName"
                            //   id="username"
                            value={accountBalance}
                            placeholder="XLM"
                            className="form-control"
                          />
                        </label>
                        <Button className="me-3" onClick={CheckBalance}>
                          Balance
                        </Button>
                      </div> */}
                     
                     
                      

                      <div className="mb-3">
                       
                        {/* <label className="me-3" htmlFor="create">
                          <Field
                            //   disabld={apiStatus.inProgress}
                            //   disabled={true}
                            //   name="userName"
                            //   id="username"
                            value={anchorAddress}
                            placeholder="Anchor Address"
                            className="form-control"
                            onChange={(e) => setAnchorAddress(e.target.value)}
                          />
                        </label> */}
                        {/* <Button className="me-3" onClick={BuildTrustLIne}>
                          Build TrustLine
                        </Button> */}
                      </div>
                      <div className="mb-3">
                        {/* <Button className="me-3" onClick={BuildTrustLIne}>
                          Submit 
                        </Button> */}
                        <label className="me-3" htmlFor="Beneficiary Account">
                          <Field
                            //   disabld={apiStatus.inProgress}
                            //   disabled={true}
                            //   name="userName"
                            //   id="username"
                            value={beneficiary}
                            placeholder="Enter Beneficiary Account"
                            className="form-control"
                            onChange ={(e)=>{setBeneficiary(e.target.value.trim())}}
                          />
                        </label>
                     <Button onClick={()=>{
                      if(beneficiary){
                      setShow(true)
                        
                      }else{
                        window.alert("enter benificiary first")
                      }
                      }
                      }>Pay With Card</Button>

                      </div>
                      

                      
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            {/* <input type="text" placeholder=''/> 
                <input type="text" placeholder=''/> 
                  */}
          </div>
        </Card.Body>
      </Card>
    </div>
    </>
  );
};
