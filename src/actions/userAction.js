import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";
import { client } from "../config/client";

import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
      validateStatus: () => true,
    };
    const { data, status } = await client.post(
      "/api/users/login/",
      {
        username: email,
        password: password,
      },
      config
    );
    if (status === 200) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.token,
      });
      let exp = new Date(
        new Date().valueOf() + 1000 * 60 * 60 * 1000
      ).toUTCString();
      document.cookie = `userInfo=${data.token} ; expires=${exp};domain=.cocobeauty.ir ;path=/ ;secure;SameSite=Lax;`;
      localStorage.setItem("userInfo", JSON.stringify(data.token));
    } else {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: "نام کاربری یا رمز عبور اشتباه است",
      });
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};

export const logout = () => (dispatch) => {
  let yesterday = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24);
  document.cookie = `userInfo=; expires=${yesterday} ; path=/;`;
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: USER_DETAILS_RESET,
  });
  dispatch({
    type: ORDER_LIST_MY_RESET,
  });
};

export const register = (email, password, name) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await client.post(
      "/api/users/register/",
      {
        email: email,
        password: password,
        name: name,
      },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data.token,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.token,
    });
    let exp = new Date(
      new Date().valueOf() + 1000 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `userInfo=${data.token} ; expires=${exp};domain=.cocobeauty.ir ;path=/;secure ;SameSite=Lax;`;
    localStorage.setItem("userInfo", JSON.stringify(data.token));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
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
    const { data } = await client.get(`/api/users/${id}/`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};

export const updateUserDetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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
    const { data } = await client.put(
      `/api/users/profile/update/`,
      user,
      config
    );
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};
