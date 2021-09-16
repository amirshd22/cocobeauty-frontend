import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productListReducer,
  productCreateReviewReducer,
  productListByCategoryReducer,
  productListHasOffReducer,
} from "./reducers/productReducers";

import {
  userLoginReducers,
  userRegisterReducers,
  userDetailsReducers,
  userUpdateDetailsReducers,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
} from "./reducers/orderReducers";
import { cartReducers as cartReducer } from "./reducers/cartReducers";
import {
  blogListReducer,
  blogCreateCommentReducer,
  blogDetailsReducer,
} from "./reducers/blogReducers";
import { carouselImagesReducer } from "./reducers/stylesReducers";
import getCookie from "./utils/getCookie";
const reducer = combineReducers({
  productList: productListReducer,
  productListHasOff: productListHasOffReducer,

  productListByCategory: productListByCategoryReducer,
  productDetails: productDetailsReducer,
  productReviewCreate: productCreateReviewReducer,
  cart: cartReducer,
  userLogin: userLoginReducers,
  userRegister: userRegisterReducers,
  userDetails: userDetailsReducers,
  userUpdate: userUpdateDetailsReducers,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  blogCommentCreate: blogCreateCommentReducer,
  blogList: blogListReducer,
  blogDetails: blogDetailsReducer,
  carouselImages: carouselImagesReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = getCookie("userInfo")
  ? getCookie("userInfo")
  : localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressInfoFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressInfoFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
