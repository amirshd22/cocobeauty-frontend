import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
function AboutUsScreen() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="container">
      <Row>
        <Col md={12}>
          <div className="d-flex flex-column justify-content-center align-items-center w-50 m-auto">
            <Image
              src="/profile.png"
              className="h-100 w-50 rounded-circle "
              fluid
              style={{ objectFit: "cover" }}
            />
            <h5 className="text-center">مدیر عامل</h5>
            <h5 className="text-center">(سام روانبخش)</h5>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={4}>
          <div className="d-flex flex-column justify-content-center align-items-center w-75 m-auto">
            <Image
              src="/profile.png"
              className="h-100 w-50 rounded-circle "
              fluid
              style={{ objectFit: "cover" }}
            />
            <h5 className="text-center">بازاریابی و روابط عمومی</h5>
            <h5 className="text-center">(عسل دلخوش)</h5>
          </div>
        </Col>
        <Col md={4}>
          <div className="d-flex flex-column justify-content-center align-items-center w-75 m-auto">
            <Image
              src="/profile.png"
              className="h-100 w-50 rounded-circle "
              fluid
              style={{ objectFit: "cover" }}
            />
            <h5 className="text-center">طراحی و میزبانی وبسایت</h5>
            <h5 className="text-center">
              <a href="tel:09906873238">(امیرحسین دلخوش)</a>
            </h5>
          </div>
        </Col>
        <Col md={4}>
          <div className="d-flex flex-column justify-content-center align-items-center w-75 m-auto">
            <Image
              src="/profile.png"
              className="h-100 w-50 rounded-circle "
              fluid
              style={{ objectFit: "cover" }}
            />
            <h5 className="text-center">عکس برداری و کارهای گرافیکی</h5>
            <h5 className="text-center">(پارمیس روانبخش)</h5>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AboutUsScreen;
