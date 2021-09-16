import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_LIST_BY_CATEGORY_FAIL,
  PRODUCT_LIST_BY_CATEGORY_REQUEST,
  PRODUCT_LIST_BY_CATEGORY_SUCCESS,
  PRODUCT_LIST_HAS_OFF_FAIL,
  PRODUCT_LIST_HAS_OFF_REQUEST,
  PRODUCT_LIST_HAS_OFF_RESET,
  PRODUCT_LIST_HAS_OFF_SUCCESS,
} from "../constants/productConstants";
import { client } from "../config/client";

export const listProducts =
  (keyword = "", offset = "", limit = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await client.get(
        `/api/products?${keyword}&offset=${offset}&limit=${limit}`
      );
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listProductsWithHasOff = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_HAS_OFF_REQUEST });
    const { data } = await client.get(`/api/products/hasOff/`);
    dispatch({
      type: PRODUCT_LIST_HAS_OFF_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_HAS_OFF_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductsByCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_BY_CATEGORY_REQUEST });
    const { data } = await client.get(`/api/products/category?${category}`);
    dispatch({
      type: PRODUCT_LIST_BY_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_BY_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await client.get(`/api/products/product/${id}/`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST,
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

      const { data } = await client.post(
        `/api/products/product/${productId}/reviews/`,
        review,
        config
      );

      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.details
            ? error.response.data.details
            : error.details,
      });
    }
  };
