import * as actionTypes from "./types";

export const fetchPost = id => ({
  type: actionTypes.FETCH_POST,
  id,
});

export const fetchPostStart = () => ({
  type: actionTypes.FETCH_POST_START
});

export const fetchPostSuccess = post => ({
  type: actionTypes.FETCH_POST_SUCCESS,
  post,
});

export const fetchPostFail = errors => ({
  type: actionTypes.FETCH_POST_FAIL,
  errors
});

export const addPost = payload => ({
  type: actionTypes.ADD_POST,
  payload
});

export const addPostStart = () => ({
  type: actionTypes.ADD_POST_START
});

export const addPostSuccess = post => ({
  type: actionTypes.ADD_POST_SUCCESS,
  post,
});

export const addPostFail = errors => ({
  type: actionTypes.ADD_POST_FAIL,
  errors
});

export const deletePost = id => ({
  type: actionTypes.DELETE_POST,
  id,
});

export const deletePostSuccess = id => ({
  type: actionTypes.DELETE_POST_SUCCESS,
  id
});

export const deletePostStart = () => ({
  type: actionTypes.DELETE_POST_START,
});

export const deletePostFail = errors => ({
  type: actionTypes.DELETE_POST_FAIL,
  errors,
});

export const likePost = id => ({
  type: actionTypes.LIKE_POST,
  id,
});

export const likePostSuccess = id => ({
  type: actionTypes.LIKE_POST_SUCCESS,
  id
});

export const likePostStart = () => ({
  type: actionTypes.LIKE_POST_START,
});

export const likePostFail = errors => ({
  type: actionTypes.LIKE_POST_FAIL,
  errors,
});

export const unlikePost = id => ({
  type: actionTypes.UNLIKE_POST,
  id,
});

export const unlikePostSuccess = id => ({
  type: actionTypes.UNLIKE_POST_SUCCESS,
  id
});

export const unlikePostStart = () => ({
  type: actionTypes.UNLIKE_POST_START,
});

export const unlikePostFail = errors => ({
  type: actionTypes.UNLIKE_POST_FAIL,
  errors,
});

