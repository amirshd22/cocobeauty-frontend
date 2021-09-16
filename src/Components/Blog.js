import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
function Blog({ blog }) {
  return (
    <Link to={`/blog/${blog._id}/`} className="text-decoration-none">
      <Card className="rounded text-dark">
        {blog.image && (
          <Card.Img
            src={`https://api.cocobeauty.ir${blog.image}`}
            height={300}
            style={{ objectFit: "cover" }}
          />
        )}
        <Card.Body className="">
          <Link
            to={`/blog/${blog._id}/`}
            className="text-decoration-none text-dark"
          >
            <Card.Title as="div" className="mt-4 text-end ">
              <strong className="text-end">{blog.title}</strong>
            </Card.Title>
          </Link>
          <Card.Text className="text-end">
            {blog.description.substring(0, 200)}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-center bg-white">
          <small className="text-decoration-none">
            {blog.createdAt.substring(0, 10)}
          </small>
        </Card.Footer>
      </Card>
    </Link>
  );
}

export default Blog;
