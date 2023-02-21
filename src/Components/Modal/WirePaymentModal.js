import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
// import { Field, Formik } from "formik";
import axios from "axios";
import { Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";
import { encrypt, readKey, createMessage } from "openpgp";
import { useProvider } from "../context";

export const WirePaymentModal = (props) => {
  const { amount,setAmount,show, setShow, sendWireTransaction,trackingId,setTrackingId,cirecleAccountNumber,setCircleAccountNumber} = props;

  // const updateData = (e) => {
  //   setData({
  //     ...data,
  //     [e.target.name]: e.target.value,
  //   });

  //   console.log(data, "updateData");
  // };
  const handleClose = () => {
    setShow(false);
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
          <Modal.Title>{"Wire Transfer"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={sendWireTransaction}>
          <Modal.Body className={""}>
            {/* <Form> */}
            <Form.Group>
              <Form.Label> Amount</Form.Label>
              <Form.Control
                value={amount}
                onChange={(e)=>{setAmount(e.target.value)}}
                name="amount"
                type="text"
                placeholder="Enter Amount"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tracking Reference Number</Form.Label>
              <Form.Control
              value={trackingId}
                type="text"
                name="trackRef"
                onChange={(e)=>{setTrackingId(e.target.value)}}
                placeholder="Enter Tracking Reference Number"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Beneficiary Bank Account</Form.Label>
              <Form.Control
              value={cirecleAccountNumber}
                onChange={(e)=>{setCircleAccountNumber(e.target.value)}}
                name="benificiary"
                type="text"
                placeholder="Enter Beneficiary Bank Account"
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
              {"Make Payment"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};
