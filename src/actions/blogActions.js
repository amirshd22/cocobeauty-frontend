import {
  BLOG_LIST_FAIL,
  BLOG_LIST_SUCCESS,
  BLOG_LIST_REQUEST,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_CREATE_COMMENT_FAIL,
  BLOG_CREATE_COMMENT_SUCCESS,
  BLOG_CREATE_COMMENT_REQUEST,
} from "../constants/blogConstants";
import { client } from "../config/client";
export const listBlogs = () => async (dispatch) => {
  try {
    dispatch({ type: BLOG_LIST_REQUEST });
    const { data } = await client.get(`/api/blogs/`);
    dispatch({
      type: BLOG_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listBlogDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BLOG_DETAILS_REQUEST });
    const { data } = await client.get(`/api/blogs/blog/${id}/`);
    dispatch({
      type: BLOG_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BLOG_DETAILS_FAIL,
      payload:
        error.response && error.response.data.details
          ? error.response.data.details
          : error.details,
    });
  }
};

export const createBlogComment =
  (blogId, comment) => async (dispatch, getState) => {
    try {
      dispatch({
        type: BLOG_CREATE_COMMENT_REQUEST,
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
        `/api/blogs/blog/${blogId}/create-comment/`,
        comment,
        config
      );

      dispatch({
        type: BLOG_CREATE_COMMENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BLOG_CREATE_COMMENT_FAIL,
        payload:
          error.response && error.response.data.details
            ? error.response.data.details
            : error.details,
      });
    }
  };
