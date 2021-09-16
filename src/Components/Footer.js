import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark p-2">
      <Container className="text-end">
        <Row className="align-items-center">
          <Col md={4} className="text-center ">
            <Row>
              <Col md={6}>
                <Image
                  src="/agha4.png"
                  fluid
                  className="w-50"
                  alt="مقام معظم رهبری"
                />
              </Col>
              <Col md={6} className="d-flex align-items-center">
                <p className="text-light">
                  فروشگاه آنلاین کوکوبیوتی تابع قوانین جمهوری اسلامی ایران
                  میباشد
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="outline-light"
                  className="rounded"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  بازگشت به بالا
                </Button>
              </Col>
              <Col>
                <a
                  onClick={() =>
                    window.open(
                      "https://panel.aqayepardakht.ir/trustGateway/2788",
                      null,
                      "width=655, height=635, scrollbars=no, resizable=no"
                    )
                  }
                  href="javascript:void(0)"
                >
                  <img
                    style={{
                      borderRadius: 0,
                      marginRight: 10,
                      width: 100,
                      height: 120,
                    }}
                    src="https://panel.aqayepardakht.ir/trustlogo/2.svg"
                    alt="aghayepardakht"
                  />
                </a>
              </Col>
              <Col>
                <a
                  referrerpolicy="origin"
                  target="_blank"
                  href="https://trustseal.enamad.ir/?id=232255&amp;Code=Rc080FD3pYIoNNhNbXY0"
                >
                  <img
                    referrerpolicy="origin"
                    src="https://Trustseal.eNamad.ir/logo.aspx?id=232255&amp;Code=Rc080FD3pYIoNNhNbXY0"
                    alt=""
                    style={{
                      cursor: "pointer",
                      width: 100,
                      height: 120,
                    }}
                    id="Rc080FD3pYIoNNhNbXY0"
                  />
                </a>
              </Col>
            </Row>
          </Col>
          <Col md={8}>
            <Row className="justify-content-center justify-content-md-end">
              <Image
                fluid
                style={{ width: "30%", height: "30%" }}
                className="float-end"
                src="/pw.png"
              />
            </Row>
            <small className="text-light">تلفن تماس با ما: </small>
            <a className="text-light" href="tel:09120278434">
              09120278434
            </a>
            <p className="text-light">
              هفت روز هفته 24 ساعت شبانه روز پاسخگوی شما هستیم
            </p>
            <p className="text-light">
              پشتیبانی آنلاین کوکوبیوتی با همکاری رایچت پشتیبان آنلاین برای شما
            </p>
          </Col>
        </Row>
        <Row className="text-center text-muted mt-4">
          <Col className="p-3" md={4}>
            <Row>
              <i className="fas fa-truck fs-1"></i>
            </Row>
            <Row>
              <small className="text-muted">تحویل سریع</small>
            </Row>
          </Col>
          <Col className="p-3" md={4}>
            <Row>
              <i className="fas fa-headset fs-1"></i>
            </Row>
            <Row>
              <small className="text-muted"> هفت روز هفته 24 ساعته</small>
            </Row>
          </Col>
          <Col className="p-3" md={4}>
            <Row>
              <i className="far fa-check-circle fs-1"></i>
            </Row>
            <Row>
              <small className="text-muted">ضمانت اصل بودن محصولات</small>
            </Row>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={4}>
            <h5 className="text-light mb-3 text-center  text-md-end">
              با ما همراه باشید
            </h5>
            <Row className="g-1 row-cols-2 text-center">
              <Col md={6}>
                <a
                  className="text-muted"
                  href="https://www.instagram.com/cocobeauty.ir/"
                >
                  <i className="fab fa-instagram fs-3"></i>
                </a>
              </Col>
              <Col md={6}>
                <a className="text-muted" href="https://t.me/skincareomde">
                  <i className="fab fa-telegram  fs-3"></i>
                </a>
              </Col>
            </Row>
          </Col>
          <Col md={4} className="text-center text-md-end mt-4">
            <h5 className="text-light mb-3">خدمات مشتریان</h5>
            <ul style={{ listStyle: "none" }}>
              <li>
                <a className="text-muted">گزارش باگ (بزودی)</a>
              </li>
              <li>
                <a className="text-muted">حریم خصوصی</a>
              </li>
            </ul>
          </Col>
          <Col md={4} className="text-center text-md-end mt-4">
            <h5 className="text-light mb-3">کوکوبیوتی</h5>
            <ul
              className="text-center text-md-end"
              style={{ listStyle: "none" }}
            >
              <li>
                <Link to="/contact-us/" className="text-muted">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link to="/blogs/" className="text-muted">
                  وبلاگ
                </Link>
              </li>
              <li>
                <Link to="/about-us/" className="text-muted">
                  درباره
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3 text-muted">
            <small>
              استفاده از مطالب فروشگاه اینترنتی کوکوبیوتی فقط برای مقاصد غیر
              تجاری و با ذکر منبع بلامانع است.کلیه حقوق این سایت متعلق به
              فروشگاه انلاین کوکوبیوتی میباشد
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default React.memo(Footer);
