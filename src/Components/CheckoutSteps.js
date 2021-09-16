import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav className="justify-content-around mb-4 w-100">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login/">
            <Nav.Link>
              <strong>ورود</strong>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <strong>ورود</strong>
          </Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping/">
            <Nav.Link>
              <strong>اطلاعات ارسال</strong>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <strong>اطلاعات ارسال</strong>
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment/">
            <Nav.Link>
              <strong>اطلاعات پرداخت</strong>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <strong>اطلاعات پرداخت</strong>
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeOrder/">
            <Nav.Link>
              <strong>ثبت سفارش و پرداخت</strong>
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>
            <strong>ثبت سفارش و پرداخت</strong>
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default CheckoutSteps;
