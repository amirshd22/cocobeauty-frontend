import React, { useState, useEffect } from "react";
import { Row, Col, Image, Button, ListGroup, Form } from "react-bootstrap";
import { listBlogDetails, createBlogComment } from "../actions/blogActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { BLOG_CREATE_COMMENT_RESET } from "../constants/blogConstants";

function BlogDetailsScreen({ match, history }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { blog, loading, error } = useSelector((state) => state.blogDetails);
  const {
    success,
    error: errorBlogComment,
    loading: loadingBlogComment,
  } = useSelector((state) => state.blogCommentCreate);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useEffect(() => {
    if (success) {
      setComment("");
      dispatch({
        type: BLOG_CREATE_COMMENT_RESET,
      });
    }
    dispatch(listBlogDetails(match.params.id));
  }, [dispatch, match, history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createBlogComment(match.params.id, {
        comment,
      })
    );
  };

  return (
    <div className="text-end container">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={5}>
            <Row>
              {blog.image && (
                <Image
                  src={`https://api.cocobeauty.ir${blog.image}`}
                  alt={blog.title}
                  fluid
                  height={300}
                />
              )}
            </Row>
          </Col>
          <Col md={7}>
            <Row>
              <h1 className="text-muted">{blog.title}</h1>
            </Row>
          </Col>
          <Row className="p-1 mt-4">
            <p>{blog.description}</p>
          </Row>
        </Row>
      )}
      {loadingBlogComment ? (
        <Loader />
      ) : errorBlogComment ? (
        <Message variant="danger">{errorBlogComment}</Message>
      ) : (
        <Row>
          <Col md={6} className="overflow-auto" style={{ height: "350px" }}>
            <h4 className="text-muted">نظرات کاربران</h4>
            {blog.comments.length === 0 && (
              <Message variant="warning">
                هنوز نظری گفته نشده شما اولین نفر باشید
              </Message>
            )}
            <ListGroup>
              {blog.comments.map((comment) => (
                <ListGroup.Item
                  className="bg-light rounded mt-1"
                  key={comment._id}
                >
                  <strong>{comment.name}</strong>
                  <p className="text-muted text-start">
                    {comment.createdAt.substring(0, 10)}
                  </p>
                  <p>{comment.comment}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="comment">
                <Form.Label>
                  <strong>نظر خود را راجب این وبلاگ بنویسید</strong>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows="5"
                  value={comment}
                  placeholder="متن خود را بنویسید"
                  className="text-end"
                  required
                  onChange={(e) => setComment(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button
                disabled={loadingBlogComment}
                type="submit"
                className="mt-3 w-100 rounded border-0 reviewBtn"
              >
                ارسال نظر
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default BlogDetailsScreen;
