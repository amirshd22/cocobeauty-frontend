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
import { login } from "../actions/userAction";
import FormContainer from "../Components/FormContainer";

function LoginScreen({ location, history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const { loading, userInfo, error } = useSelector((state) => state.userLogin);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <FormContainer className="text-end">
      <Card className="rounded p-4">
        <h1 className="text-center">ورود به کوکوبیوتی</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>
              <strong>ایمیل خود را وارد کنید</strong>
            </Form.Label>
            <Form.Control
              required
              type="email"
              className="text-end rounded border"
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
              required
              className="text-end rounded border"
              type="password"
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="mt-3 rounded w-100"
          >
            ورود به سایت
          </Button>
        </Form>

        <Row className="py-3 text-center">
          <Col>
            <strong>کاربر جدید هستید؟</strong>{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              ثبت نام
            </Link>
          </Col>
        </Row>
      </Card>
    </FormContainer>
  );
}

export default LoginScreen;
