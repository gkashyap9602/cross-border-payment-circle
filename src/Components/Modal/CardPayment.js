import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
// import { Field, Formik } from "formik";
import axios from "axios";
import { CREATE_CARD_API, API_KEY, API_BASE_URL,TRANSFER_ASSET, GET_PUB_KEY,CREATE_PAYMENT_API ,GET_PAYMENT_STATUS_PARAMS} from "../../Api";
import { Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";
import { encrypt ,readKey,createMessage} from "openpgp";
import { useProvider } from "../context";

export const CardPayment = (props) => {
  const { show, setShow } = props;

  const {setBeneficiary,beneficiary} = useProvider()
  const [payStat,setPayStat] = useState("")



  const handleClose = () => {
    setShow(false);
  };

  const [data, setData] = useState({});

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    console.log(data,"updateData")
  };

  //get public key
  const getPubKey = async () => {
    return await axios
      .get(`${GET_PUB_KEY}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((res) => {
        console.log(res, "response get pubkey");
        console.log(res.data.data.keyId, "keyId");
        console.log(res.data.data.publicKey, "publicKey");

        return {
             keyId:res.data.data.keyId,
             publicKey:res.data.data.publicKey
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  //ends here

  //get public key
  const createCard = async () => {

    let result = await getPubKey()
    // result.publicKey

     console.log(result,"result-")
     console.log(data,"data---")

    const payload = {
      idempotencyKey: uuidv4(),
      amount: data.amount,
      expMonth:4,
      expYear:2025,
    //   verification: "cvv",
    //   source: sourceDetails,
    //   description: this.formData.description,
      keyId: "",
      encryptedData: "",
    //   channel: this.formData.channel,
      metadata: {
        phoneNumber: data.phone,
        email: data.email,
        sessionId: "xxx",
        ipAddress: "172.33.222.1",
      },
      billingDetails: {
        name: data.cardholder,
        city: data.city,
        country: "US",
        line1: data.address,
        postalCode: data.postal,
        line2: "Suite",
        district: "MA"
      },
    };

    // let cardDetails = "344"
    let cardDetails = {
      number:data.card,
        cvv:data.cvv
    }

    // const encryptedData = await encrypt(cardDetails, result.publicKey)

    // console.log(encryptedData,"encryptedData-")

    const decodedPublicKey = await readKey({ armoredKey: atob(result.publicKey) })
    const encrypted = await encrypt({
    message: await createMessage({ text: JSON.stringify(cardDetails) }), // input as Message object
    encryptionKeys: decodedPublicKey, // for encryption
})
.then((ciphertext)=>{
  return {
    encryptedMessage: btoa(ciphertext),
    keyId:result.keyId,
  }
});

payload.encryptedData = encrypted.encryptedMessage
      payload.keyId = encrypted.keyId

console.log(encrypted,"encrypted")

    console.log(payload,"payload--after")

    return await axios
      .post(`${CREATE_CARD_API}`,payload, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((res) => {
        console.log(res, "response card created api ");
        return {response:res.data,payload:payload}
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  //ends here

  //transfer api 
  const transfer = (walletId,_address,_amount)=>{

    let data = {
      idempotencyKey: uuidv4(),
      source: {
        type: "wallet",
        id: walletId
      },
      destination: {
        type: "blockchain",
        address: _address,
        chain: "XLM"
      },
      amount: {
        amount: _amount,
        currency: "USD"
      }
    }
    axios.post(`${TRANSFER_ASSET}`,data,{
      headers: {
          Authorization: `Bearer ${API_KEY}`,
      },
  })
  .then((res)=>{
    console.log(res,"res transfer")
    window.alert("transfer successfull")

  })
  .catch((err)=>{
    console.log(err,"err")
  })
  }
  //create payment
  const CreatePayment = async(e) => {
    e.preventDefault();
    let result = await createCard()

    console.log(result,"result==")
    let formdata = {
      channel:"",
      idempotencyKey: uuidv4(),
     keyId: result.payload.keyId,
     metadata: {
          "email": "satoshi@circle.com",
          "phoneNumber": "+14155555555",
          "sessionId": "DE6FA86F60BB47B379307F851E238617",
          "ipAddress": "244.28.239.130"
     },
     amount: {
          amount: result.payload.amount,
          currency: "USD"
     },
     verification: "cvv",
     source: {
          id: result.response.data.id,
          "type": "card"
     },
     description: "Payment",
     encryptedData: result.payload.encryptedData
}
  

   await  axios.post(`${CREATE_PAYMENT_API}`, formdata,{
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
    })
        .then((res) => {
            console.log(res, "result payment api ")
            window.alert("Payment Successful")
              
            // if()  
            console.log(res.data.data, "res.data.id payment api ")

            let interval = setInterval(() => {
              axios.get(`${GET_PAYMENT_STATUS_PARAMS}/${res.data.data.id}`,{
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                },
            })
              .then((res)=>{
                    console.log(res,"response payment api")
                    // setPayStat(res.data.status)
                    if(res.data.data.status==="paid"){
                      console.log("under paid")
                      console.log(beneficiary,"beneficiary trim")
                      transfer(res.data.data.merchantWalletId,beneficiary,data.amount)
                      clearInterval(interval)

                    }
                    console.log("unpaid")
              })
              .catch((err)=>{
                console.log(err,"err")
     
              })
              
            }, 5000);

        })
        .catch((err) => {
            console.log(err, "error")
        })
        .finally(()=>{
          handleClose()
        })

    // console.log(data, "data _values");
  };
  //   console.log()
  return (
    <div>
      <Modal
        centered
        // size="lg"
        className="add_Features"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{"Pay With Card"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={CreatePayment}>
          <Modal.Body className={""}>
            {/* <Form> */}
            <Form.Group>
              <Form.Label> Amount</Form.Label>
              <Form.Control
                onChange={updateData}
                name="amount"
                type="text"
                placeholder="Enter Amount"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Credit Card Number</Form.Label>
              <Form.Control
                type="text"
                name="card"
                onChange={updateData}
                placeholder="Enter credit card number"
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Expiration Date</Form.Label>
                  <Form.Control
                    onChange={updateData}
                    name="expiry"
                    type="text"
                    placeholder="MM/YY"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    onChange={updateData}
                    name="cvv"
                    type="text"
                    placeholder="CVV"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label>Billing Details</Form.Label>
              <div className="mb-3">
                <Row>
                  <Col>
                    <Form.Group>
                      {/* <Form.Label>Cardholder Name</Form.Label> */}
                      <Form.Control
                        type="name"
                        name="cardholder"
                        onChange={updateData}
                        placeholder="Cardholder Name"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      {/* <Form.Label>CVV</Form.Label> */}
                      <Form.Control
                        onChange={updateData}
                        name="postal"
                        type="text"
                        placeholder="Postal Code"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <div className="mb-3">
                <Row>
                  <Col>
                    <Form.Group>
                      {/* <Form.Label>Cardholder Name</Form.Label> */}
                      <Form.Control
                        type="text"
                        name="city"
                        onChange={updateData}
                        placeholder="City "
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      {/* <Form.Label>CVV</Form.Label> */}
                      <Form.Control
                        onChange={updateData}
                        name="district"
                        type="text"
                        placeholder="District"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <div className="mb-3">
                <Form.Group>
                  <Form.Control
                    onChange={updateData}
                    name="address"
                    type="text"
                    placeholder="Address"
                  />
                </Form.Group>
              </div>

              <div className="mb-3">
                <Row>
                  <Col>
                    <Form.Group>
                      {/* <Form.Label>Cardholder Name</Form.Label> */}
                      <Form.Control
                        type="text"
                        name="phone"
                        onChange={updateData}
                        placeholder="Phone "
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      {/* <Form.Label>CVV</Form.Label> */}
                      <Form.Control
                        onChange={updateData}
                        name="country"
                        type="text"
                        placeholder="Country Code"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
              <Form.Group>
                <Form.Control
                  onChange={updateData}
                  name="email"
                  type="text"
                  placeholder="Email"
                />
              </Form.Group>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer className={"text-center"}>
            <Button
              variant="light"
              onClick={handleClose}
              className={"style.Btn"}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={"style.createFeatureBtn"}
              // disabled={editItem ? false : formik.isSubmitting || !formik.dirty || !formik.isValid}
            >
              {"Make Payment"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};
