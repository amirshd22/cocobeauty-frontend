import {
  CAROUSEL_IMAGES_FAIL,
  CAROUSEL_IMAGES_REQUEST,
  CAROUSEL_IMAGES_SUCCESS,
} from "../constants/styleConstants";
import { client } from "../config/client";

export const carouselImages = () => async (dispatch) => {
  try {
    dispatch({ type: CAROUSEL_IMAGES_REQUEST });
    const { data } = await client.get(`/api/styles/images/`);
    dispatch({
      type: CAROUSEL_IMAGES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAROUSEL_IMAGES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
