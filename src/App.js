import Footer from "./Components/Footer";
import Header from "./Components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import CompleteOrderScreen from "./screens/CompleteOrderScreen";
import DefaultScreen from "./screens/DefaultScreen";
import BlogsScreen from "./screens/BlogsScreen";
import BlogDetailsScreen from "./screens/BlogDetailsScreen";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutUsScreen from "./screens/AboutUsScreen";
import ContactUsScreen from "./screens/ContactUsScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="w-100">
        <Switch>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/blogs/" component={BlogsScreen} />
          <Route path="/blog/:id/" component={BlogDetailsScreen} />
          <Route path="/product/:id/" component={ProductScreen} />
          <Route path="/brand" component={DefaultScreen} />
          <Route path="/category" component={DefaultScreen} />
          <Route path="/cart/:id?/" component={CartScreen} />
          <Route path="/order/:id?/" component={OrderScreen} />
          <Route path="/login/" component={LoginScreen} />
          <Route path="/register/" component={RegisterScreen} />
          <Route path="/profile/" component={ProfileScreen} />
          <Route path="/shipping/" component={ShippingScreen} />
          <Route path="/payment/" component={PaymentScreen} />
          <Route path="/place-order/" component={PlaceOrderScreen} />
          <Route path="/verify/" component={CompleteOrderScreen} />
          <Route path="/about-us/" component={AboutUsScreen} />
          <Route path="/contact-us/" component={ContactUsScreen} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
