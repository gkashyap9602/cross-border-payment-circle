import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
// import { Field, Formik } from "formik";
import axios from "axios";
import { CARD_PAYMENT_API, API_KEY } from "../../Api";

import { Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
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


    const onSubmit = (e) => {
        e.preventDefault();

        axios.post(`${CARD_PAYMENT_API}`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        })
            .then((res) => {
                console.log(res, "result")
            })
            .catch((err) => {
                console.log(err, "error")
            })

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
                <Form onSubmit={onSubmit}>
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
