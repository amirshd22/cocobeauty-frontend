import {
  CAROUSEL_IMAGES_FAIL,
  CAROUSEL_IMAGES_REQUEST,
  CAROUSEL_IMAGES_SUCCESS,
} from "../constants/styleConstants";

export const carouselImagesReducer = (state = { images: [] }, action) => {
  switch (action.type) {
    case CAROUSEL_IMAGES_REQUEST:
      return { loading: true, images: [] };

    case CAROUSEL_IMAGES_SUCCESS:
      return { loading: false, images: action.payload };

    case CAROUSEL_IMAGES_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
