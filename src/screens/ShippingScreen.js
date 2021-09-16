import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../Components/FormContainer";
import CheckoutSteps from "../Components/CheckoutSteps";

import { saveShippingAddress } from "../actions/cartActions";

function ShippingScreen({ history }) {
  const { shippingAddress } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, phoneNumber }));
    history.push("/payment");
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login?redirect=shipping");
    }
  }, [history]);

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <Card className="rounded p-4">
        <Form onSubmit={submitHandler} className="text-end">
          <h1 className="text-center">اطلاعات ارسال</h1>
          <Form.Group controlId="address" className="mb-2">
            <Form.Label>آدرس</Form.Label>
            <Form.Control
              type="address"
              required
              className="text-end rounded border"
              placeholder="آدرس خود را وارد کنید"
              value={address ? address : ""}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="city" className="mb-2">
            <Form.Label>شهر</Form.Label>
            <Form.Control
              type="text"
              className="text-end rounded border"
              required
              placeholder="شهر خود را وارد کنید"
              value={city ? city : ""}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="postalCode" className="mb-2">
            <Form.Label>کد پستی</Form.Label>
            <Form.Control
              type="text"
              className="text-end rounded border"
              required
              placeholder="کد پستی خود را وارد کنید"
              value={postalCode ? postalCode : ""}
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="phoneNumber" className="mb-2">
            <Form.Label>شماره تلفن همراه</Form.Label>
            <Form.Control
              type="phone-number"
              className="text-end rounded border"
              required
              placeholder="شماره تلفن"
              value={phoneNumber ? phoneNumber : ""}
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button className="rounded w-100" type="submit" variant="primary">
            ادامه
          </Button>
        </Form>
      </Card>
    </FormContainer>
  );
}

export default ShippingScreen;
