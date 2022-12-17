import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function BlogEdit() {
  const { blogid } = useParams();
  const [data, setData] = useState([]);

  const fetchProducts = async () => {
    const response = await axios
      .get(`http://localhost/taskdatabase2/blogs.php/${blogid}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    setData(response.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const [formErrors, setFormErrors] = useState({});
  const [inputs, setInputs] = useState([]);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value, id: blogid });
    setFormErrors(validate(inputs));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(formErrors).length === 0) {
      axios.put(`http://localhost/taskdatabase2/blogs.php/${blogid}`,inputs);
      window.location.reload(false);
    } else {
      const elem = document.getElementById("errorMassage");
      elem.innerHTML = "Invalied Data";
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z ]+$/g;

    if (!values.title) {
      errors.title = "Title is required";
    } else if (!regex.test(values.title)) {
      errors.title = "Only letters are allowed in the title";
    }

    if (!values.img) {
      errors.img = "Image is required";
    }

    if (!values.content) {
      errors.content = "Content is required";
    }
    return errors;
  };

  return (
    <div className="contener">
      <form onSubmit={handleSubmit}>
        <div className="ui two column stackable center aligned grid">
          <br />
          <h1 style={{ color: "red" }} id="errorMassage"></h1>
          <div className="middle aligned row">
            <div className="column lp">
              <img
                style={{
                  width: "200px",
                  hight: "200px",
                  marginRight: "30px",
                  marginTop: "50px",
                }}
                src={data.img}
              />
            </div>

            <div className="column rp">
              <h4 style={{ marginTop: "12px" }}>Title</h4>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                className="ui brown block header"
                placeholder={data.title}
              />
              <p style={{ color: "red" }}>{formErrors.title}</p>
              <h4>content</h4>
              <input
                type="text"
                name="content"
                onChange={handleChange}
                className="ui brown block header"
                placeholder={data.description}
              />
              <p style={{ color: "red" }}>{formErrors.content}</p>
              <h4>Image</h4>
              <input
                type="text"
                name="img"
                onChange={handleChange}
                className="ui brown block header"
              />
              <p style={{ color: "red" }}>{formErrors.img}</p>

              <button className="btn btn-info" type="submit">
                Edit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default BlogEdit;
