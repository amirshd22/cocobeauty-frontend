import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails, getUserDetails } from "../actions/userAction";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import { listMyOrders } from "../actions/orderActions";
import NumberFormat from "react-number-format";

function ProfileScreen({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const { loading, user, error } = useSelector((state) => state.userDetails);

  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.userUpdate);
  const {
    loading: loadingOrders,
    error: orderErrors,
    orders,
  } = useSelector((state) => state.orderListMy);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login/");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else if (success) {
        dispatch({ type: USER_UPDATE_RESET });
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, user, history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserDetails({
          id: user._id,
          name,
          email,
          password,
        })
      );
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <Row className="text-end container m-auto">
      {loading && <Loader />}
      <Col md={3}>
        <h2>مشخصات کاربر</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
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
              className="text-end"
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>
              <strong>ایمیل</strong>
            </Form.Label>
            <Form.Control
              type="email"
              required
              className="text-end"
              placeholder="ایمیل"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {show ? (
            <>
              <Form.Group controlId="password">
                <Form.Label>
                  <strong>پسورد جدید</strong>
                </Form.Label>
                <Form.Control
                  className="text-end"
                  type="password"
                  placeholder="پسورد جدید را وارد کنید"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="passwordConfirm">
                <Form.Label>
                  <strong>تکرار پسورد جدید</strong>
                </Form.Label>
                <Form.Control
                  className="text-end"
                  type="password"
                  placeholder="پسورد جدید را وارد کنید"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </>
          ) : null}
          <div
            onClick={() => {
              setShow(!show);
            }}
            style={{ cursor: "pointer" }}
          >
            <small>تغییر رمز عبور</small>
          </div>
          <Button
            type="submit"
            variant="primary"
            className="mt-3 rounded w-100"
          >
            بروزرسانی
          </Button>
        </Form>
      </Col>

      <Col md={9}>
        <h2>خرید های من</h2>
        {loadingOrders ? (
          <></>
        ) : orderErrors ? (
          <Message variant="danger">{orderErrors}</Message>
        ) : (
          <Table striped responsive className="table-lg">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>تاریخ</th>
                <th>قیمت کل</th>
                <th>وضعیت پرداخت</th>
                <th>وضعیت ارسال</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order) => (
                  <tr key={order._id} className="text-center">
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>
                      <NumberFormat
                        value={order.TotalPrice}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"تومان"}
                      />
                    </td>
                    <td className="text-center">
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td className="text-center">
                      {order.isDelivered ? (
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order.taransId}`}>
                        <Button className="btn btn-sm rounded">
                          اطلاعات بیشتر
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;
