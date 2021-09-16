import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Container,
  Image,
  ListGroup,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userAction";

const navbar_nav_dropdown = [
  {
    id: 5,
    title: "تجهیزات جانبی",
    items: [
      {
        itemId: 51,
        itemsTitle: "جیدرولر",
        linkTo: "/category/jade-roller",
      },
      {
        itemId: 52,
        itemsTitle: "فیس براش",
        linkTo: "/category/face-brush",
      },
      {
        itemId: 53,
        itemsTitle: "شات ماسک",
        linkTo: "/category/shut-mask",
      },
      {
        itemId: 54,
        itemsTitle: "آیس رولر",
        linkTo: "/category/ice-roller",
      },
      {
        itemId: 55,
        itemsTitle: "سایر محصولات",
        linkTo: "/category/others",
      },
    ],
  },
  {
    id: 8,
    title: "مراقبت  مو",
    items: [
      {
        itemId: 81,
        itemsTitle: "شامپو",
        linkTo: "/category/shampoo",
      },
      {
        itemId: 82,
        itemsTitle: "ماسک مو",
        linkTo: "/category/mask-mo",
      },
      {
        itemId: 83,
        itemsTitle: "نرم کننده مو",
        linkTo: "/category/narmkonande",
      },
      {
        itemId: 84,
        itemsTitle: "روغن آرگان",
        linkTo: "/category/roghan-argan",
      },
      {
        itemId: 85,
        itemsTitle: "تقویت کننده مو",
        linkTo: "/category/taghviat-konande",
      },
    ],
  },
  {
    id: 4,
    title: "مراقبت  بدن",
    items: [
      {
        itemId: 41,
        itemsTitle: "اسکراب بدن",
        linkTo: "/category/scrub-badan",
      },
      {
        itemId: 42,
        itemsTitle: "لوسیون بدن",
        linkTo: "/category/lossion-badan",
      },
      {
        itemId: 43,
        itemsTitle: "نمک بدن",
        linkTo: "/category/namak-badan",
      },
      {
        itemId: 44,
        itemsTitle: "شاور ژل",
        linkTo: "/category/shower-gel",
      },
    ],
  },
  {
    id: 3,
    title: "مراقبت  لب",
    items: [
      {
        itemId: 31,
        itemsTitle: "ماسک لب",
        linkTo: "/category/mask-lab",
      },
      {
        itemId: 32,
        itemsTitle: "بالم لب",
        linkTo: "/category/balm-lab",
      },
      {
        itemId: 33,
        itemsTitle: "لیپ گلاس",
        linkTo: "/category/leap-glass",
      },
      {
        itemId: 34,
        itemsTitle: "تینت لب",
        linkTo: "/category/tint-lab",
      },
    ],
  },
  {
    id: 6,
    title: "مراقبت دور چشم",
    items: [
      {
        itemId: 61,
        itemsTitle: "کرم دور چشم",
        linkTo: "/category/krem-dore-cheshm",
      },
      {
        itemId: 62,
        itemsTitle: "پج زیر چشم",
        linkTo: "/category/patch-zire-cheshm",
      },
      {
        itemId: 63,
        itemsTitle: "سرم های غلطکدار",
        linkTo: "/category/serom-ghaltakdar",
      },
      {
        itemId: 64,
        itemsTitle: "ماسک های دور چشم",
        linkTo: "/category/mask-dore-cheshm",
      },
    ],
  },
  {
    id: 2,
    title: "مراقبت صورت",
    items: [
      {
        itemId: 21,
        itemsTitle: "شوینده های صورت",
        linkTo: "/category/shoyande-sorat",
      },
      {
        itemId: 22,
        itemsTitle: "تونر ها",
        linkTo: "/category/toner",
      },
      {
        itemId: 23,
        itemsTitle: "سرم و اسنس",
        linkTo: "/category/serom-and-esens",
      },
      {
        itemId: 24,
        itemsTitle: "مرطوب کننده و آبرسان",
        linkTo: "/category/martob-konande",
      },
      {
        itemId: 25,
        itemsTitle: "اسپری آب",
        linkTo: "/category/spray-ab",
      },
      {
        itemId: 26,
        itemsTitle: "ضد آفتاب",
        linkTo: "/category/zede-aftab",
      },
      {
        itemId: 27,
        itemsTitle: "ماسک",
        linkTo: "/category/mask",
      },
      {
        itemId: 28,
        itemsTitle: "اسکراب ها",
        linkTo: "/category/scrub",
      },
      {
        itemId: 29,
        itemsTitle: "ماسک های ورقه ای",
        linkTo: "/category/varaghei",
      },
    ],
  },
  {
    id: 1,
    title: "برند های کوکوبیوتی",
    items: [
      {
        itemId: 12,
        itemsTitle: "بیوآکوا",
        linkTo: "/brand/bioaqua",
      },
      {
        itemId: 13,
        itemsTitle: "ونزن",
        linkTo: "/brand/venzen",
      },
      {
        itemId: 14,
        itemsTitle: "ایمیجز",
        linkTo: "/brand/images",
      },
      {
        itemId: 15,
        itemsTitle: "لوفمیس",
        linkTo: "/brand/lofmiss",
      },
      {
        itemId: 16,
        itemsTitle: "کانسایی",
        linkTo: "/brand/kansay",
      },
      {
        itemId: 17,
        itemsTitle: "شیشانگخو",
        linkTo: "/brand/shishongkho",
      },
      {
        itemId: 18,
        itemsTitle: "سنانا",
        linkTo: "/brand/senana",
      },
      {
        itemId: 19,
        itemsTitle: "جام تام",
        linkTo: "/brand/jomtom",
      },
      {
        itemId: 110,
        itemsTitle: "لانبنا",
        linkTo: "/brand/lanbena",
      },
    ],
  },
];

function Header() {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    window.location.reload();
  };

  return (
    <header className="w-100 border-0 sticky-top bg-light" style={{}}>
      <Navbar
        className="text-end border-0 w-75 m-auto"
        bg="light"
        style={{ height: 100 }}
      >
        <Container className="justify-content-around">
          <LinkContainer to="/">
            <Navbar.Brand>
              <Image
                fluid
                src="/pb.png"
                className="float-start logo"
                style={{ objectFit: "cover" }}
              />
            </Navbar.Brand>
          </LinkContainer>
          <Nav>
            <LinkContainer className="text-center" to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart fs-4"></i>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/blogs">
              <Nav.Link>
                <i className="fas fa-search fs-4"></i>
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <>
                <LinkContainer to="/profile/">
                  <Nav.Link>
                    <i className="fas fa-user fs-4"></i>
                  </Nav.Link>
                </LinkContainer>

                <Nav.Link onClick={logoutHandler}>
                  <i className="fas fa-sign-out-alt fs-4"></i>
                </Nav.Link>
              </>
            ) : (
              <LinkContainer to="/login/">
                <Nav.Link>
                  <i className="fas fa-user fs-4"></i>
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Navbar
        className="text-end border-0 border-bottom w-100  m-auto"
        bg="light"
        expand="lg"
      >
        <Container className="w-100">
          <LinkContainer to="/">
            <Button variant="light"></Button>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarHeader" className="fs-6" />
          <Navbar.Collapse className="justify-content-center" id="navbarHeader">
            <Nav className="d-flex flex-column-reverse flex-md-row">
              {navbar_nav_dropdown.map((dropdown) => (
                <NavDropdown
                  title={dropdown.title}
                  key={dropdown.id}
                  id={dropdown.id}
                  menuVariant="light"
                >
                  <ListGroup variant="flush">
                    {dropdown.items.map((item) => (
                      <ListGroup.Item key={item.itemId}>
                        <LinkContainer to={item.linkTo}>
                          <NavDropdown.Item
                            key={item.itemsTitle}
                            className="text-end"
                          >
                            {item.itemsTitle}
                          </NavDropdown.Item>
                        </LinkContainer>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </NavDropdown>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default React.memo(Header);
