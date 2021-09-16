import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Lottie from "react-lottie";
import animationData from "../lotties/mail.json";

function ContactUsScreen() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <Container>
      <Row>
        <Col md={6}>
          <Lottie
            options={defaultOptions}
            className="justify-content-center align-items-center m-auto w-50"
          />
        </Col>
        <Col
          className="text-end d-flex flex-column justify-content-center"
          md={6}
        >
          <h2> 😃کوکوبیوتی به پشتیبانی خوبش معروفه</h2>
          <p>
            سوالات خود را از طریق پشتبانی آنلاین از ما بپرسید و ما همیشه به شما
            جواب میدهیم😊
          </p>
          <a
            className="text-dark"
            href="https://www.instagram.com/cocobeauty.ir/"
          >
            اینستاگرام کوکوبیوتی را دنبال کنید
          </a>
          <h4>شماره تماس برای اطلاعات بیشتر</h4>
          <a href="tel:09120278434">09120278434</a>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactUsScreen;
