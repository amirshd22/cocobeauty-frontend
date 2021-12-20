import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../Components/Message";
import { getOrderDetails } from "../actions/orderActions";
import Loader from "../Components/Loader";
import { useCookies } from "react-cookie";
import NumberFormat from "react-number-format";

function OrderScreen({ match, history }) {
  const orderId = match.params.id;
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies(["transId"]);

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { userInfo } = useSelector((state) => state.userLogin);
  if (!userInfo) {
    history.push(`/login?redirect=order/${orderId}`);
  }
  const dispatch = useDispatch();
  if (!loading && !error) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) =>
        acc +
        (item.hasOff ? item.price - item.price * item.hasOff : item.price) *
          item.qty,
      0
    );
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const payOrderNow = () => {
    try {
      window.location.replace(
        `https://panel.aqayepardakht.ir/startpay/${order.taransId}`
      );
    } catch (err) {
      localStorage.setItem("transId", "دریافت کد پیگیری با خطا رو به رو شد");
    }
  };
  useEffect(() => {
    if (!order || order.taransId !== orderId) {
      dispatch(getOrderDetails(orderId));
    }
    setCookie("transId", `${orderId}`, {
      path: "/",
      expires: new Date(new Date().valueOf() + 1000 * 60 * 60 * 1000),
      sameSite: "lax",
      secure: true,
      domain: "cocobeauty.ir",
    });
    localStorage.setItem("transId", `${orderId}`);
    // eslint-disable-next-line
  }, [order, orderId, dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div className="text-end container">
      <h1>با موفقعیت ثبت شد کد پیگیری شما</h1>
      <p className="fs-4">{order.taransId}</p>
      <Row>
        <Col md={4}>
          <Card className="rounded">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>خلاصه خرید شما</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>
                      <NumberFormat
                        value={order.itemsPrice}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"تومان"}
                      />
                    </strong>
                  </Col>
                  <Col>
                    <small>:قیمت کالا ها</small>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong>
                      <NumberFormat
                        value={order.shippingPrice}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"تومان"}
                      />
                    </strong>
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
                    <strong>
                      <NumberFormat
                        value={order.TotalPrice}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"تومان"}
                      />
                    </strong>
                  </Col>
                  <Col>
                    <small>:مبلغ قابل پرداخت</small>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {order.orderItems.length === 0 ? (
                  <Button
                    disabled
                    type="button"
                    className="w-100 rounded"
                    variant="primary"
                  >
                    سفارشی ثبت نشده
                  </Button>
                ) : order.isPaid ? (
                  <Button
                    type="button"
                    className="w-100 rounded"
                    variant="primary"
                    disabled
                  >
                    پرداخت شده
                  </Button>
                ) : (
                  <Button
                    onClick={payOrderNow}
                    type="button"
                    className="w-100 rounded"
                    variant="primary"
                  >
                    رفتن به درگاه
                  </Button>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>اطلاعات ارسال</h2>
              <p>
                <strong>نام: </strong>
                {order.user.name}
              </p>
              <p>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                <strong>:ایمیل</strong>
              </p>
              <Row>
                <small>{order.shippingAddress.address}</small>
              </Row>
              <Row>
                <small>{order.shippingAddress.city}</small>
              </Row>
              <Row>
                <small>{order.shippingAddress.postalCode}</small>
              </Row>
              <small>{order.shippingAddress.phoneNumber}</small>

              {order.isDelivered ? (
                <>
                  <Message variant="success">
                    ارسال شده {order.deliveredAt.substring(0, 10)}
                  </Message>
                  <p>:کد رهگیری پستی</p>
                  <Message variant="success">{order.post_code}</Message>
                </>
              ) : (
                <Message variant="warning">هنوز ارسال نشده است</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>اطلاعات پرداخت</h2>
              <p>
                {order.paymentMethod}
                <strong> :پرداخت از طریق</strong>
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  پرداخت شده {order.paidAt.substring(0, 10)}
                </Message>
              ) : (
                <Message variant="warning">هنوز پرداخت نشده</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>اطلاعات خرید شما</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => {
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
                            <strong>
                              {item.qty} X{" "}
                              <NumberFormat
                                value={
                                  item.hasOff
                                    ? item.price - item.price * item.hasOff
                                    : item.price
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"تومان"}
                              />
                              ={" "}
                              <NumberFormat
                                value={
                                  item.qty * item.hasOff
                                    ? item.price - item.price * item.hasOff
                                    : item.price
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"تومان"}
                              />
                            </strong>
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

export default OrderScreen;
