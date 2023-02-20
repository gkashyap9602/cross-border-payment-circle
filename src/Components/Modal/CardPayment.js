import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
// import { Field, Formik } from "formik";
import axios from "axios";
import { CREATE_CARD_API, API_KEY, API_BASE_URL, GET_PUB_KEY } from "../../Api";
import { Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";
import { encrypt ,readKey,createMessage} from "openpgp";

export const CardPayment = (props) => {
  const { show, setShow } = props;

  const handleClose = () => {
    setShow(false);
  };

  const [data, setData] = useState({});

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
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
    const payload = {
      idempotencyKey: uuidv4(),
      amount: 20,
    //   verification: "cvv",
    //   source: sourceDetails,
    //   description: this.formData.description,
      keyId: "",
      encryptedData: "",
    //   channel: this.formData.channel,
      metadata: {
        phoneNumber: +9157887689,
        email: "gkashyap9602@gmail.com",
        sessionId: "xxx",
        ipAddress: "172.33.222.1",
      },
    };

    // let cardDetails = "344"
    let cardDetails = {
        cvv:323
    }

    // const encryptedData = await encrypt(cardDetails, result.publicKey)

    // console.log(encryptedData,"encryptedData-")

    const decodedPublicKey = await readKey({ armoredKey: atob(result.publicKey) })
const encrypted = await encrypt({
    message: await createMessage({ text: 'Hello, World!' }), // input as Message object
    encryptionKeys: decodedPublicKey, // for encryption
});

console.log(encrypted,"encrypted")

    console.log(payload,"payload--after")

    await axios
      .get(`${API_BASE_URL}`,payload, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      })
      .then((res) => {
        console.log(res, "response get pubkey");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  //ends here

  //create payment
  const CreatePayment = (e) => {
    e.preventDefault();
    createCard()
    // let formdata = {};

    // axios.post(`${CREATE_CARD_API}`, {
    //     headers: {
    //         Authorization: `Bearer ${API_KEY}`,
    //     },
    // })
    //     .then((res) => {
    //         console.log(res, "result")
    //     })
    //     .catch((err) => {
    //         console.log(err, "error")
    //     })

    console.log(data, "data _values");
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
                        name="amount"
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
