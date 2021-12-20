import React, { useEffect } from "react";
import Product from "../Components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProductsByCategory } from "../actions/productActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import {
  PRODUCT_DETAILS_RESET,
  PRODUCT_LIST_RESET,
} from "../constants/productConstants";

function DefaultScreen({ match, history }) {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector(
    (state) => state.productListByCategory
  );
  const findType = history.location.pathname.split("/")[2];

  let keyword = `q=${findType}`;
  useEffect(() => {
    dispatch(listProductsByCategory(keyword));

    dispatch({
      type: PRODUCT_DETAILS_RESET,
    });
    dispatch({
      type: PRODUCT_LIST_RESET,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch, findType, keyword]);
  return (
    <div className="text-end container">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div>
            <h1 className="text-center">پیشنهاد های کوکوبیوتی برای شما</h1>
          </div>
          <div className="row row-cols-3 row-cols-md-3 g-1 g-md-4">
            {products.length === 0 && (
              <div className="w-100">
                <Message variant="info">
                  ): متاسفانه هیچ محصولی پیدا نشد{" "}
                </Message>
              </div>
            )}
            {products.map((product) => {
              return (
                <div key={product._id} className="imageContainer col">
                  <Product product={product} />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default DefaultScreen;
