import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../Components/CheckoutSteps";
import { Link } from "react-router-dom";
import Message from "../Components/Message";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import Loader from "../Components/Loader";
import NumberFormat from "react-number-format";
function PlaceOrderScreen({ history }) {
  const { order, error, success, loading } = useSelector(
    (state) => state.orderCreate
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const { shippingAddress, paymentMethod, cartItems } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();
  const itemsPrice = cartItems.reduce(
    (acc, item) =>
      acc +
      Math.round(
        item.hasOff ? item.price - item.price * item.hasOff : item.price
      ) *
        item.qty,
    0
  );
  const shippingPrice = itemsPrice > 500000 ? 0 : 15000;
  const totalPrice = Number(itemsPrice) + Number(shippingPrice);
  const taxes = Number(totalPrice * 0.01);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  if (!paymentMethod) {
    history.push("/payment/");
  }

  useEffect(() => {
    if (success) {
      history.push(`/order/${order.taransId}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
    if (!userInfo) {
      history.push("/login?redirect=place-order");
    }
    // eslint-disable-next-line
  }, [success, history, dispatch]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
      })
    );
  };
  return (
    <div className="container">
      <CheckoutSteps step4 step3 step2 step1 />
      <Row className="text-end">
        <Col md={4}>
          <Card className="rounded">
            {loading ? (
              <Loader />
            ) : (
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>?????????????? ???????? ??????</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>
                        <NumberFormat
                          value={itemsPrice}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"??????????"}
                        />
                      </strong>
                    </Col>
                    <Col>
                      <small>:???????? ???????? ????</small>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>
                        <NumberFormat
                          value={shippingPrice}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"??????????"}
                        />
                      </strong>
                    </Col>
                    <Col>
                      <small>:?????????? ??????????</small>
                    </Col>
                  </Row>
                  <small className="text-muted fs-6">
                    ???????? ?????? ?????????? ?????????? ???????? ?????????? ?????????? ?????????? ???????????? ??????????
                  </small>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>
                        <NumberFormat
                          value={taxes}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"??????????"}
                        />
                      </strong>
                    </Col>
                    <Col>
                      <small>:???????????? ????????</small>
                    </Col>
                  </Row>
                  <small className="text-muted fs-6">
                    ???????????? ?????? ???? ?????? ?????? ???? ?????? ?????????? ???? ???????? ???? ?????????? ?????????? ????
                  </small>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>
                        <NumberFormat
                          value={totalPrice}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"??????????"}
                        />
                      </strong>
                    </Col>
                    <Col>
                      <small>:???????? ?????? ????????????</small>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {error && (
                  <ListGroup.Item>
                    <Message variant="danger">{error}</Message>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  {cartItems.length === 0 ? (
                    <Button
                      disabled
                      type="button"
                      className="w-100 rounded"
                      variant="primary"
                    >
                      ?????? ???????? ?????? ???????? ??????
                    </Button>
                  ) : (
                    <Button
                      onClick={placeOrder}
                      type="button"
                      className="w-100 rounded"
                      variant="primary"
                    >
                      ?????? ?????????? ?? ??????????
                    </Button>
                  )}
                </ListGroup.Item>
              </ListGroup>
            )}
          </Card>
        </Col>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>?????????????? ??????????</h2>
              <Row>
                <small>{shippingAddress.address}</small>
              </Row>
              <Row>
                <small>{shippingAddress.city}</small>
              </Row>
              <Row>
                <small>{shippingAddress.postalCode}</small>
              </Row>
              <small>{shippingAddress.phoneNumber}</small>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>?????????????? ????????????</h2>
              <p>
                {paymentMethod}
                <strong> :???????????? ???? ????????</strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>?????????? ???????? ??????</h2>
              {cartItems.length === 0 ? (
                <Message variant="info">?????? ???????? ?????? ???????? ????????????</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={2}>
                            <Image
                              src={`https://api.cocobeauty.ir${item.image}`}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} X{" "}
                            <NumberFormat
                              value={Math.round(
                                item.hasOff
                                  ? item.price - item.price * item.hasOff
                                  : item.price
                              )}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"??????????"}
                            />
                            ={" "}
                            <NumberFormat
                              value={Math.round(
                                item.qty * item.hasOff
                                  ? item.price - item.price * item.hasOff
                                  : item.price
                              )}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"??????????"}
                            />
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
