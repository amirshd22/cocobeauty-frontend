import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../Components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen({ match, location, history }) {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <Row className="text-end container m-auto">
      <Col md={4}>
        <Card className="rounded">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) تعداد کل
                محصولات شما
              </h2>
              <strong>
                تومان
                {cartItems.reduce(
                  (acc, item) =>
                    acc +
                    item.qty *
                      (item.hasOff
                        ? item.price - item.price * Number(item.hasOff)
                        : item.price),
                  0
                )}
              </strong>
            </ListGroup.Item>
            <ListGroup.Item>
              {cartItems.length === 0 ? (
                <Button type="button" disabled className="w-100 rounded">
                  سبد خرید شما خالی است
                </Button>
              ) : (
                <Button
                  onClick={checkoutHandler}
                  type="button"
                  className="w-100 rounded"
                >
                  ادامه فرآیند خرید
                </Button>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
      <Col md={8}>
        <h1>سبد خرید</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            سبد خرید شما خالی هست <Link to="/">بازگشت</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => {
              return (
                <ListGroup.Item>
                  <Row>
                    <Col md={2}>
                      <Image
                        rounded
                        src={`https://api.cocobeauty.ir${item.image}`}
                        alt={item.name}
                        fluid
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}/`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>
                      <small>
                        تومان
                        {item.hasOff
                          ? item.price - item.price * Number(item.hasOff)
                          : item.price}
                      </small>
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        className="w-50 rounded border"
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => {
                          return (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Col>
                    <Col className="text-center mt-2 mt-md-0" md={2}>
                      <Button
                        type="button"
                        variant="outline-primary"
                        className="rounded"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>حذف
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
    </Row>
  );
}

export default CartScreen;
