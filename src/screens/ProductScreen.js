import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Carousel from "react-bootstrap/Carousel";
import Rating from "../Components/Rating";
import colors from "../config/colors";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import {
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_LIST_RESET,
} from "../constants/productConstants";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import NumberFormat from "react-number-format";

function ProductScreen({ match, history }) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { product, error, loading } = productDetails;

  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    success,
    error: errorProductReview,
    loading: loadingProductReview,
  } = useSelector((state) => state.productReviewCreate);

  useEffect(() => {
    if (success) {
      setRating(0);
      setComment("");
      dispatch({
        type: PRODUCT_CREATE_REVIEW_RESET,
      });
    }
    dispatch(listProductDetails(match.params.id));
    dispatch({
      type: PRODUCT_LIST_RESET,
    });
  }, [dispatch, match, history, success]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };
  console.log(product);
  return (
    <div className="text-end container">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="w-100">
          <div className="border">
            <Row className="justify-content-end g-0">
              <Col md={7}>
                <Carousel>
                  <Carousel.Item>
                    <Image
                      src={`https://api.cocobeauty.ir${product.image}`}
                      alt={product.name}
                      fluid
                      className="w-100"
                    />
                  </Carousel.Item>
                  {product.images
                    ? product.images.map((image) => (
                        <Carousel.Item>
                          <Image
                            src={`https://api.cocobeauty.ir${image.image}`}
                            alt={image.name}
                            fluid
                            className="w-100"
                          />
                        </Carousel.Item>
                      ))
                    : null}
                </Carousel>
              </Col>
              <Col md={5}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews}`}
                      color={colors.yellow}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {product.hasOff ? (
                      <>
                        <h6>:قیمت با تخفیف</h6>

                        <NumberFormat
                          value={
                            product.price -
                            product.price * Number(product.hasOff)
                          }
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"تومان"}
                        />
                      </>
                    ) : (
                      <>
                        <h6>:قیمت</h6>
                        <NumberFormat
                          value={product.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"تومان"}
                        />
                      </>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h6>:توضیحات</h6>
                    <div className="overflow-auto" style={{ height: "300px" }}>
                      <p>{product.description}</p>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Card className="rounded-bottom">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        {product.hasOff ? (
                          <>
                            <Col>
                              <NumberFormat
                                value={
                                  product.price -
                                  product.price * Number(product.hasOff)
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"تومان"}
                              />
                            </Col>

                            <Col>
                              <strong className="fs-6">
                                :قیمت محصول با تخفیف
                              </strong>
                            </Col>
                          </>
                        ) : (
                          <>
                            <Col>
                              <NumberFormat
                                value={product.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"تومان"}
                              />
                            </Col>

                            <Col>
                              <strong className="fs-6">:قیمت محصول</strong>
                            </Col>
                          </>
                        )}
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <strong>
                            {product.countInStock > 0 ? `موجود` : `ناموجود`}
                          </strong>
                        </Col>
                        <Col>
                          <strong className="fs-6">:وضعیت محصول</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col className="my-1">
                            <Form.Control
                              as="select"
                              value={qty}
                              className="w-50 rounded border"
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => {
                                  return (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  );
                                }
                              )}
                            </Form.Control>
                          </Col>
                          <Col>
                            <small>:تعداد</small>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item className="w-100">
                      {product.countInStock === 0 ? (
                        <Button
                          type="button"
                          disabled
                          variant="dark"
                          className="w-100 rounded"
                        >
                          ناموجود
                        </Button>
                      ) : (
                        <Button
                          onClick={addToCartHandler}
                          type="button"
                          className="w-100 rounded submitButton border-0"
                        >
                          افزودن به سبد خرید
                        </Button>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </div>
          <Row className="mt-4">
            <Col md={6} className="overflow-auto" style={{ height: "350px" }}>
              <h4 className="text-muted">نظرات کاربران</h4>
              {product.reviews.length === 0 && (
                <Message variant="warning">
                  هنوز نظری گفته نشده شما اولین نفر باشید
                </Message>
              )}
              <ListGroup>
                {product.reviews.map((review) => (
                  <ListGroup.Item className="bg-light rounded" key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} color={colors.yellow} />
                    <p className="text-muted text-start">
                      {review.createdAt.substring(0, 10)}
                    </p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col md={6}>
              <h4 className="text-muted">نظر خود را بنویسید</h4>
              {loadingProductReview && <Loader />}
              {success && (
                <Message variant="success">متن شما با موفقیت ثبت شد</Message>
              )}
              {errorProductReview && (
                <Message variant="danger">{errorProductReview}</Message>
              )}

              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="raging">
                    <Form.Label>
                      <strong>امتیاز دهی</strong>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">...کلیک کنید</option>
                      <option value="1">1 - بد</option>
                      <option value="2">2 - متوسط</option>
                      <option value="3">3 - خوب</option>
                      <option value="4">4 - خیلی خوب</option>
                      <option value="5">5 - عالی</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment">
                    <Form.Label>
                      <strong>نظر شما</strong>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="5"
                      value={comment}
                      placeholder="متن خود را بنویسید"
                      className="text-end"
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    disabled={loadingProductReview}
                    type="submit"
                    className="mt-3 w-100 rounded border-0 reviewBtn"
                  >
                    ارسال نظر
                  </Button>
                </Form>
              ) : (
                <Message variant="info">
                  لطفا <Link to="/login/">وارد</Link> شوید
                </Message>
              )}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
