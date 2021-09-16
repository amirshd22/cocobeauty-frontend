import {
  BLOG_LIST_FAIL,
  BLOG_LIST_SUCCESS,
  BLOG_LIST_REQUEST,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_RESET,
  BLOG_CREATE_COMMENT_FAIL,
  BLOG_CREATE_COMMENT_SUCCESS,
  BLOG_CREATE_COMMENT_REQUEST,
  BLOG_CREATE_COMMENT_RESET,
} from "../constants/blogConstants";

export const blogListReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case BLOG_LIST_REQUEST:
      return { loading: true, blogs: [] };
    case BLOG_LIST_SUCCESS:
      return { loading: false, blogs: action.payload };

    case BLOG_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const blogDetailsReducer = (
  state = { blog: { comments: [] } },
  action
) => {
  switch (action.type) {
    case BLOG_DETAILS_REQUEST:
      return { loading: true, ...state };
    case BLOG_DETAILS_SUCCESS:
      return { loading: false, blog: action.payload };

    case BLOG_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case BLOG_DETAILS_RESET:
      return { blog: { comments: [] } };
    default:
      return state;
  }
};

export const blogCreateCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_CREATE_COMMENT_REQUEST:
      return { loading: true };
    case BLOG_CREATE_COMMENT_SUCCESS:
      return { loading: false, success: true };

    case BLOG_CREATE_COMMENT_FAIL:
      return { loading: false, error: action.payload };

    case BLOG_CREATE_COMMENT_RESET:
      return {};

    default:
      return state;
  }
};
