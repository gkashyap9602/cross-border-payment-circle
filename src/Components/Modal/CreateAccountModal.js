import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Form, Row, Col } from "react-bootstrap";

export const CreateAccountModal = (props) => {
  const { show, setShow, data, setData, createWireAccount } = props;

  const handleClose = () => {
    setShow(false);
  };

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

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
          <Modal.Title>{"Transfer"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={createWireAccount}>
          <Modal.Body className={""}>
            {/* <Form> */}
            <Form.Group>
              <Form.Label> Account Number</Form.Label>
              <Form.Control
                value={data.accountNumber}
                onChange={updateData}
                name="accountNumber"
                type="text"
                placeholder="Enter Account"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Routing Number</Form.Label>
              <Form.Control
                value={data.routingNumber}
                type="text"
                name="routingNumber"
                onChange={updateData}
                placeholder="Enter Routing Number"
              />
            </Form.Group>
            {/* <Row>
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
            </Row> */}
            <Form.Group>
              <Form.Label>Billing Details</Form.Label>
              <div className="mb-3">
                <Row>
                  <Col>
                    <Form.Group>
                      {/* <Form.Label>Cardholder Name</Form.Label> */}
                      <Form.Control
                        value={data.name}
                        type="name"
                        name="name"
                        onChange={updateData}
                        placeholder="Cardholder Name"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      {/* <Form.Label>CVV</Form.Label> */}
                      <Form.Control
                        value={data.postal}
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
                        value={data.city}
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
                        value={data.district}
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
                <Row>
                  <Col>
                    <Form.Group>
                      {/* <Form.Label>Cardholder Name</Form.Label> */}
                      <Form.Control
                        value={data.countryCode}
                        type="text"
                        name="countryCode"
                        onChange={updateData}
                        placeholder="Country Code"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      {/* <Form.Label>CVV</Form.Label> */}
                      <Form.Control
                        value={data.address}
                        onChange={updateData}
                        name="address"
                        type="text"
                        placeholder="Address"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Bank Address</Form.Label>
              <div className="mb-3">
                <Row>
                  <Col>
                    <Form.Group>
                      {/* <Form.Label>Cardholder Name</Form.Label> */}
                      <Form.Control
                        value={data.bankName}
                        type="name"
                        name="bankName"
                        onChange={updateData}
                        placeholder="Bank Name"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      {/* <Form.Label>CVV</Form.Label> */}
                      <Form.Control
                        value={data.bankCity}
                        onChange={updateData}
                        name="bankCity"
                        type="text"
                        placeholder="bankCity"
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
                        value={data.bankCountryCode}
                        type="text"
                        name="bankCountryCode"
                        onChange={updateData}
                        placeholder="bankCountryCode "
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      {/* <Form.Label>CVV</Form.Label> */}
                      <Form.Control
                        value={data.bankdistrict}
                        onChange={updateData}
                        name="bankdistrict"
                        type="text"
                        placeholder="bankDistrict"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Control
                value={data.bankAddress}
                type="text"
                name="bankAddress"
                onChange={updateData}
                placeholder="Enter Bank Address"
              />
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
              {"Config Your Bank"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};
