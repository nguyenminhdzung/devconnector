import * as actionTypes from "./types";

export const fetchPosts = () => ({
  type: actionTypes.FETCH_POSTS
});

export const fetchPostsStart = () => ({
  type: actionTypes.FETCH_POSTS_START
});

export const fetchPostsSuccess = posts => ({
  type: actionTypes.FETCH_POSTS_SUCCESS,
  posts,
});

export const fetchPostsFail = errors => ({
  type: actionTypes.FETCH_POSTS_FAIL,
  errors
});