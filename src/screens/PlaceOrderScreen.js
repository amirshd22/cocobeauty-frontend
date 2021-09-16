import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../Components/CheckoutSteps";
import { Link } from "react-router-dom";
import Message from "../Components/Message";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import Loader from "../Components/Loader";
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
      (item.hasOff ? item.price - item.price * item.hasOff : item.price) *
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
                  <h2>اطلاعات خرید شما</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>تومان{itemsPrice}</strong>
                    </Col>
                    <Col>
                      <small>:قیمت کالا ها</small>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>تومان{shippingPrice}</strong>
                    </Col>
                    <Col>
                      <small>:هزینه ارسال</small>
                    </Col>
                  </Row>
                  <small className="text-muted fs-6">
                    خرید های بالای پانصد هزار تومان هزینه ارسال رایگان دارند
                  </small>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>تومان{taxes}</strong>
                    </Col>
                    <Col>
                      <small>:مالیات خرید</small>
                    </Col>
                  </Row>
                  <small className="text-muted fs-6">
                    مالیات شما در اخر بعد از ثبت سفارش به مبلغ کل اضافه خواهد شد
                  </small>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>تومان{totalPrice}</strong>
                    </Col>
                    <Col>
                      <small>:مبلغ قال پرداخت</small>
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
                      سبد خرید شما خالی است
                    </Button>
                  ) : (
                    <Button
                      onClick={placeOrder}
                      type="button"
                      className="w-100 rounded"
                      variant="primary"
                    >
                      ثبت سفارش و ادامه
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
              <h2>اطلاعات ارسال</h2>
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
              <h2>اطلاعات پرداخت</h2>
              <p>
                {paymentMethod}
                <strong> :پرداخت از طریق</strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>خلاصه خرید شما</h2>
              {cartItems.length === 0 ? (
                <Message variant="info">سبد خرید شما خالی میباشد</Message>
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
                            {item.hasOff
                              ? item.price - item.price * item.hasOff
                              : item.price}{" "}
                            ={" "}
                            {item.qty * item.hasOff
                              ? item.price - item.price * item.hasOff
                              : item.price}
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
