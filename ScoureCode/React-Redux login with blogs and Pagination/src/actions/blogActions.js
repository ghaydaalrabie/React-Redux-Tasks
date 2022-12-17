import { ADD_BLOG, DELETE_BLOG , FETCH_BLOGS } from "../actions/types";


export const addBlog = (blog) => {
    return {
        type: ADD_BLOG,
        payload: blog
    }
}

export const deleteBlog = (blog) => {
    return {
        type: DELETE_BLOG,
        payload: blog.id
    }
}

export const fetchBlogs = (blogs) => {
  return {
    type: FETCH_BLOGS,
    payload: blogs,
  };
};