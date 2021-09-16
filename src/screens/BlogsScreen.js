import React, { useEffect } from "react";

import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { listBlogs } from "../actions/blogActions";

import { useDispatch, useSelector } from "react-redux";
import { BLOG_DETAILS_RESET } from "../constants/blogConstants";
import Blog from "../Components/Blog";

function BlogsScreen({ history }) {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogList);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    dispatch(listBlogs());
    dispatch({
      type: BLOG_DETAILS_RESET,
    });
  }, [dispatch, history]);

  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {blogs.map((blog) => {
            return (
              <div key={blog._id} className="col">
                <Blog blog={blog} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BlogsScreen;
