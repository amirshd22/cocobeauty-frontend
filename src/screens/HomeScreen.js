import React, { useEffect, useState } from "react";
import Product from "../Components/Product";
import { useDispatch, useSelector } from "react-redux";
import {
  listProducts,
  listProductsWithHasOff,
} from "../actions/productActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_LIST_RESET,
} from "../constants/productConstants";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { carouselImages } from "../actions/stylesActions";
import Highlights from "../Components/Highlights";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { Helmet } from "react-helmet";
const highlights = [
  {
    id: 1,
    link: "/category/post-charb",
    name: "پوست های چرب",
    image: "/charb.PNG",
  },
  {
    id: 2,
    link: "/category/post-khoshk",
    name: "پوست های خشک",
    image: "/khoshk.PNG",
  },
  {
    id: 3,
    link: "/category/all-type-post",
    name: "انواع پوست",
    image: "/others.PNG",
  },
];

function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const {
    error: errorProducts,
    loading: loadingProducts,
    products,
  } = useSelector((state) => state.productList);
  const { hasOffProducts } = useSelector((state) => state.productListHasOff);
  const { images, loading, error } = useSelector(
    (state) => state.carouselImages
  );

  const [offset, setOffset] = useState(0);
  // eslint-disable-next-line
  const [limit, setLimit] = useState(9);
  let keyword = history.location.search.split("?")[1];

  useEffect(() => {
    dispatch({
      type: PRODUCT_LIST_RESET,
    });
    dispatch(carouselImages());

    getProducts();
    dispatch({
      type: PRODUCT_DETAILS_RESET,
    });
    // eslint-disable-next-line
  }, [keyword, history, dispatch]);

  const getProducts = () => {
    dispatch(listProducts(keyword, offset, limit));
    dispatch(listProductsWithHasOff());
    setOffset(offset + limit);
  };
  const hasOffProduct = hasOffProducts ? hasOffProducts[0] : null;
  return (
    <div className="text-end">
      <Helmet>
        <meta
          name="description"
          content="فروشگاه آنلاین کوکوبیوتی فروش انواع محصولات پوستی بهداشتی"
        />
        <title>CocoBeauty</title>
      </Helmet>
      <ListGroup variant="flush">
        {loading ? (
          <div className="d-flex justify-content-center">
            <Loader />
          </div>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {!keyword ? (
              <>
                <ListGroup.Item className="mb-2">
                  <Row className="row-cols-1 row-cols-md-3">
                    <Col md={hasOffProducts ? 8 : 12} className="m-auto">
                      <Carousel className="rounded" indicators>
                        {images.map((image) => {
                          return (
                            <Carousel.Item key={image.name}>
                              <Image
                                src={`https://api.cocobeauty.ir${image.image}`}
                                className=" w-100 h-100"
                                style={{ objectFit: "cover" }}
                              />
                            </Carousel.Item>
                          );
                        })}
                      </Carousel>
                    </Col>
                    <Col md={4}>
                      {hasOffProduct && (
                        <Link
                          to={`/product/${hasOffProduct._id}/`}
                          onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                          }
                          className="text-decoration-none"
                        >
                          <Card className="h-100">
                            <Card.Header
                              className="text-light text-center"
                              style={{ backgroundColor: "#fc6767" }}
                            >
                              {" "}
                              تخفیف هفته کوکوبیوتی
                            </Card.Header>
                            <Card.Img
                              src={`https://api.cocobeauty.ir${hasOffProduct.image}`}
                              alt={hasOffProduct.name}
                              className="rounded-0"
                            />
                            <Card.Body>
                              <ListGroup>
                                <ListGroup.Item className="text-center text-muted">
                                  {hasOffProduct.name}
                                </ListGroup.Item>
                                <ListGroup.Item className="text-center text-muted">
                                  <Row>
                                    <Col>
                                      <NumberFormat
                                        value={Math.round(
                                          hasOffProduct.price -
                                            hasOffProduct.price *
                                              Number(hasOffProduct.hasOff)
                                        )}
                                        displayType="text"
                                        thousandSeparator={true}
                                        prefix={"تومان"}
                                      />
                                    </Col>
                                    <Col>:قیمت به همراه تخفیف</Col>
                                  </Row>
                                </ListGroup.Item>
                              </ListGroup>
                            </Card.Body>
                            <Card.Footer
                              className="text-light text-center"
                              style={{ backgroundColor: "#fc6767" }}
                            >
                              %تخفیف{" "}
                              {hasOffProduct.hasOff.substring(0, 4) * 100}
                            </Card.Footer>
                          </Card>
                        </Link>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
              </>
            ) : (
              <Message variant="info">{keyword} جستجوی شما برای</Message>
            )}
            <ListGroup.Item>
              <h3 className="text-center mt-2">تمامی محصولات مناسب پوست شما</h3>
              <div className="row row-cols-1 row-cols-md-3 g-3 m-auto  w-75">
                {highlights.map((highlight) => (
                  <Highlights key={highlight.id} highlight={highlight} />
                ))}
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="productContainer m-auto">
              <h1 className="text-center ">محصولات جدید کوکوبیوتی</h1>
              {loadingProducts && <Loader />}
              {errorProducts && (
                <Message variant="danger">{errorProducts}</Message>
              )}

              <div className={`row row-cols-3 row-cols-md-3 g-1 g-md-4`}>
                {products.map((product) => {
                  return (
                    <div key={product._id} className="col">
                      <Product product={product} />
                    </div>
                  );
                })}
              </div>
              {!keyword && (
                <div className="text-center">
                  <Button
                    onClick={getProducts}
                    variant="outline-dark"
                    className="btn-sm w-50 mt-2"
                  >
                    مشاهده بیشتر
                  </Button>
                </div>
              )}
            </ListGroup.Item>
          </>
        )}
      </ListGroup>
    </div>
  );
}

export default HomeScreen;
