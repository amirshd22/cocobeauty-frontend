import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
} from "../constants/orderConstants";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
import { client } from "../config/client";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };
    const { data } = await client.post(`/api/orders/add/`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };
    const { data } = await client.get(`/api/orders/${id}/`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};

export const payOrder =
  (id, paymentResult = {}) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_PAY_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          // Authorization: `Bearer ${userInfoFromCookies().token}`,
        },
      };
      const { data } = await client.put(
        `/api/orders/${id}/pay/`,
        paymentResult,
        config
      );

      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
      localStorage.removeItem("transId");
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.details
            ? error.response.data.details
            : error.details,
      });
      localStorage.removeItem("transId");
    }
  };

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo}`,
      },
    };
    const { data } = await client.get(`/api/orders/myorders/`, config);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};
