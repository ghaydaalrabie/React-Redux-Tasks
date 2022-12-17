import axios from "axios";

const API_URL = "http://localhost/taskdatabase2/";

const register = (username, email, password) => {
  return axios.post(API_URL + "user.php", {
    username,
    email,
    password,
  } , {
    headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }});
};

const login = (username, password) => {
  return axios
    .post(
      API_URL + "read.php",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      }
    )
    .then((response) => {
      console.log("response", response);
    
        localStorage.setItem("user", JSON.stringify(response.data));
      

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
