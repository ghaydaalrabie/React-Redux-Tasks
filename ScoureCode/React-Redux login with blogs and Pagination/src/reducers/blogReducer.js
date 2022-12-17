import { ADD_BLOG, DELETE_BLOG, FETCH_BLOGS } from "../actions/types";
import axios from "axios";


const initialState = {
    blogs: []
}

const blogReducer = (state = initialState, action) => {
    switch (action.type) {


      case ADD_BLOG:
        
        console.log("action.payload", action.payload);
        axios.post("http://localhost/taskdatabase2/create.php", action.payload , {
         headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }});
        return {
          ...state,
          blogs: [...state.blogs, action.payload],
        };
        
      case DELETE_BLOG:
       
        return {
          ...state,
          blogs: state.blogs.filter((blog) => blog.id !== action.payload),
        };

      case FETCH_BLOGS:
        return {
          ...state,
          blogs: action.payload,
        };

      default:
        return state;
    }
}

export default blogReducer;