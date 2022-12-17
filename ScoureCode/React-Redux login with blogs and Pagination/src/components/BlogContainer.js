import React, { useId } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { addBlog, fetchBlogs } from "../actions/blogActions";
import { deleteBlog } from "../actions/blogActions";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function BlogContainer(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [img, setImg] = React.useState("");
  let id = Math.floor(Math.random() * 1000);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  //Api Fetch Data from php file

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("http://localhost/taskdatabase2/index.php");
      const data = await res.json();
      props.fetchBlogs(data);
      console.log("data", data);
    };
    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = props.blogs.slice(indexOfFirstPost, indexOfLastPost);

  const [query, setquery] = useState("");
  const [state, setstate] = useState({
    query: "",
    list: [],
  });

  //search

  const handleChange2 = (e) => {
    setquery(e.target.value);
    const fetchPosts = async () => {
      const res = await fetch(
        "http://localhost/taskdatabase2/index.php?name=" + e.target.value
      );

      const data = await res.json();
      props.fetchBlogs(data);
    };
    fetchPosts();
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.blogs.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [userInfo, setInfo] = useState({
    name: props.blogs.name,
    email: props.blogs.email,
  });
  const handleChange = (event) => {
    setInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    props.addBlog(userInfo);
    setTitle("");
    setContent("");
    setImg("");
    id = 0;
    setModalShow(false);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user", user);

  const handleDelete = (blog) => {
    props.deleteBlog(blog);
  };

  return (
    <div>
      <form style={{ marginTop: "30px", marginLeft: "920px" }}>
        <input
          type="search"
          placeholder="Search ? "
          value={query}
          onChange={handleChange2}
        />
      </form>
      <Modal
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Blog</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="img">Image</label>
              <input
                type="text"
                className="form-control"
                name="img"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide} type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <Modal
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Blog
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                className="form-control"
                name="description"
                rows="3"
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="img">Image</label>
              <input
                type="text"
                className="form-control"
                name="img"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide} type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <h1 className="text-center mt-5">Blogs</h1>
      <div className="container">
        <div className="row justify-content-end">
          <Button
            className="btn btn-success col-2 "
            variant="primary"
            onClick={() => setModalShow(true)}
          >
            Add Blog
          </Button>
        </div>
      </div>
      <div className="container row mt-5">
        {currentPosts.length > 0
          ? currentPosts.map((blog) => {
              return (
                <div key={blog.id} className="col-4">
                  <ul>
                    {state.query === ""
                      ? ""
                      : state.list.map((post) => {
                          return <li key={post.title}>{post.title}</li>;
                        })}
                  </ul>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      style={{ height: "130px" }}
                      variant="top"
                      src={blog.img}
                    />
                    <Card.Body>
                      <Card.Title> Title : {blog.title}</Card.Title>
                      <Card.Text> Description : {blog.description}</Card.Text>

                      <Button
                        variant="danger"
                        onClick={() => handleDelete(blog)}
                      >
                        Delete
                      </Button>
                     
                      <Link className="btn btn-info mx-2" to={`/blog/${blog.id}`}>
                        Edit
                      </Link>
             
                    </Card.Body>
                  </Card>
                </div>
              );
            })
          : null}
      </div>
      <ul className="pagination justify-content-center">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    blogs: state.blogReducer.blogs,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    addBlog: (blog) => dispatch(addBlog(blog)),
    deleteBlog: (id) => dispatch(deleteBlog(id)),
    fetchBlogs: (blogs) => dispatch(fetchBlogs(blogs)),
  };
};
// connect(mapStateToProps, mapDispatchToProps)(MyVerticallyCenteredModal)
export default connect(mapStateToProps, mapDispatchToProps)(BlogContainer);
