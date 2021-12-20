import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import FormContainer from "../Components/FormContainer";

function RegisterScreen({ location, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const { loading, userInfo, error } = useSelector(
    (state) => state.userRegister
  );

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [dispatch, userInfo, redirect, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(email, password, name));
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <FormContainer className="text-end">
      <Card className="rounded p-4">
        <h1 className="text-center">ثبت نام در کوکوبیوتی</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>
              <strong>نام و نام خانوادگی</strong>
            </Form.Label>
            <Form.Control
              type="name"
              required
              placeholder="نام و نام خانوادگی"
              value={name}
              className="text-end rounded border"
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>
              <strong>ایمیل خود را وارد کنید</strong>
            </Form.Label>
            <Form.Control
              className="text-end rounded border"
              type="email"
              required
              placeholder="ایمیل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>
              <strong>رمز عبور</strong>
            </Form.Label>
            <Form.Control
              className="text-end rounded border"
              type="password"
              required
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="passwordConfirm">
            <Form.Label>
              <strong>تکرار رمز عبور</strong>
            </Form.Label>
            <Form.Control
              className="text-end rounded border"
              type="password"
              required
              placeholder="تکرار رمز عبور"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="mt-3 rounded w-100"
          >
            ثبت نام
          </Button>
        </Form>
        <Row className="py-3 text-center">
          <Col>
            <strong> قبلا ثبت نام کرده اید؟</strong>{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              وارد شوید
            </Link>
          </Col>
        </Row>
      </Card>
    </FormContainer>
  );
}

export default RegisterScreen;
