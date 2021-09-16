import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../Components/FormContainer";
import CheckoutSteps from "../Components/CheckoutSteps";

import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen({ history }) {
  const { shippingAddress } = useSelector((state) => state.cart);
  const [paymentMethod, setPaymentMethod] = useState("melat");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const dispatch = useDispatch();

  if (!shippingAddress.address) {
    history.push("/shipping/");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/place-order/");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend" className="text-end">
            <strong>انتخاب درگاه بانکی</strong>
          </Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="درگاه بانک ملت"
              name="paymentMethod"
              id="melat"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <div className="text-center mt-5">
          <Button type="submit" className="rounded text-end" variant="primary">
            ادامه
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
