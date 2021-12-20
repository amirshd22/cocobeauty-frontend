import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import { payOrder, getOrderDetails } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { useCookies } from "react-cookie";
function CompleteOrderScreen({ history }) {
  // eslint-disable-next-line
  const [cookies, setCookie] = useCookies();
  const transactionId = cookies.transId;

  const dispatch = useDispatch();
  const { loading, error, success, orderDetails } = useSelector(
    (state) => state.orderPay
  );
  const { order } = useSelector((state) => state.orderDetails);
  const handlePay = () => {
    history.push("/profile/");
  };

  useEffect(() => {
    if (!success) {
      dispatch(payOrder(transactionId));
    }
    dispatch(getOrderDetails(transactionId));
  }, [dispatch, transactionId, success]);

  const OrderView = ({ text, failed }) => {
    return (
      <>
        <h1 className="text-center">{text}</h1>
        <p className="text-center">{transactionId}:کد پیگیری</p>
        {failed && (
          <p className="text-center">
            مبلغ کسر شده در صورت ناموفق بودن تراکنش به صورت خودکار بعد از 24
            ساعت به حساب شما بازگردانده میشود
          </p>
        )}
      </>
    );
  };

  return (
    <Container className="d-flex justify-content-center align-items-center w-100">
      <Card className="w-100">
        <ListGroup variant="flush">
          {loading ? (
            <Loader />
          ) : error ? (
            <>
              <ListGroup.Item>
                <OrderView failed text={error} />
              </ListGroup.Item>

              <ListGroup.Item className="text-center container">
                <strong>اطلاعات خرید شما</strong>
                {order ? (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item) => {
                      return (
                        <ListGroup.Item>
                          <Container className="p-2 m-auto w-100">
                            <Row className="row-cols-1">
                              <Col md={2} className="text-center">
                                <Image
                                  src={`https://api.cocobeauty.ir${item.image}`}
                                  rounded
                                  fluid
                                  className="w-50"
                                />
                              </Col>
                              <Col md={8} className="text-center align-center">
                                {item.name}
                              </Col>
                              <Col md={2} className="text-center align-center">
                                <strong>{item.qty}</strong> تعداد
                              </Col>
                            </Row>
                          </Container>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                ) : null}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant="primary" onClick={handlePay} className="w-100">
                  بازگشت به حساب کاربری
                </Button>
              </ListGroup.Item>
            </>
          ) : (
            <>
              <ListGroup.Item>
                <OrderView
                  text={
                    orderDetails
                      ? orderDetails.message
                      : "!تراکنش با موفقیت انجام نشد"
                  }
                  failed
                />
              </ListGroup.Item>
              <ListGroup.Item className="text-center container">
                <strong>اطلاعات خرید شما</strong>
                {order ? (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item) => {
                      return (
                        <ListGroup.Item>
                          <Container className="p-2 m-auto w-100">
                            <Row className="row-cols-1">
                              <Col md={2} className="text-center">
                                <Image
                                  src={`https://api.cocobeauty.ir${item.image}`}
                                  rounded
                                  fluid
                                  className="w-50"
                                />
                              </Col>
                              <Col md={8} className="text-center align-center">
                                {item.name}
                              </Col>
                              <Col md={2} className="text-center align-center">
                                <strong>{item.qty}</strong> تعداد
                              </Col>
                            </Row>
                          </Container>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                ) : null}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button variant="primary" onClick={handlePay} className="w-100">
                  بازگشت به حساب کاربری
                </Button>
              </ListGroup.Item>
            </>
          )}
        </ListGroup>
      </Card>
    </Container>
  );
}

export default CompleteOrderScreen;
