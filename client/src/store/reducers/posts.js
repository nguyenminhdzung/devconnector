import {
  DELETE_POST_FAIL,
  DELETE_POST_START,
  DELETE_POST_SUCCESS,
  FETCH_POSTS_FAIL,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  LIKE_POST_FAIL,
  LIKE_POST_START,
  LIKE_POST_SUCCESS,
  UNLIKE_POST_FAIL,
  UNLIKE_POST_START,
  UNLIKE_POST_SUCCESS
} from "../actions/types";

const initialState = {
  posts: [],
  loading: false,
  errors: {}
};

const fetchPostsStart = (state, action) => ({
  ...state,
  loading: true,
  posts: [],
  errors: {},
});

const fetchPostsSuccess = (state, action) => ({
  ...state,
  loading: false,
  posts: action.posts,
  errors: {}
});

const fetchPostsFail = (state, action) => ({
  ...state,
  loading: false,
  errors: action.errors
});

const deletePostStart = (state, action) => ({
  ...state,
  loading: true,
  errors: {},
});

const deletePostSuccess = (state, action) => ({
  ...state,
  loading: false,
  errors: {}
});

const deletePostFail = (state, action) => ({
  ...state,
  loading: false,
  errors: action.errors
});

const likePostStart = (state, action) => ({
  ...state,
  loading: true,
  errors: {},
});

const likePostSuccess = (state, action) => ({
  ...state,
  loading: false,
  errors: {}
});

const likePostFail = (state, action) => ({
  ...state,
  loading: false,
  errors: action.errors
});

const unlikePostStart = (state, action) => ({
  ...state,
  loading: true,
  errors: {},
});

const unlikePostSuccess = (state, action) => ({
  ...state,
  loading: false,
  errors: {}
});

const unlikePostFail = (state, action) => ({
  ...state,
  loading: false,
  errors: action.errors
});


export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_START:
      return fetchPostsStart(state, action);
    case FETCH_POSTS_SUCCESS:
      return fetchPostsSuccess(state, action);
    case FETCH_POSTS_FAIL:
      return fetchPostsFail(state, action);
    case DELETE_POST_START:
      return deletePostStart(state, action);
    case DELETE_POST_SUCCESS:
      return deletePostSuccess(state, action);
    case DELETE_POST_FAIL:
      return deletePostFail(state, action);
    case LIKE_POST_START:
      return likePostStart(state, action);
    case LIKE_POST_SUCCESS:
      return likePostSuccess(state, action);
    case LIKE_POST_FAIL:
      return likePostFail(state, action);
    case UNLIKE_POST_START:
      return unlikePostStart(state, action);
    case UNLIKE_POST_SUCCESS:
      return unlikePostSuccess(state, action);
    case UNLIKE_POST_FAIL:
      return unlikePostFail(state, action);
    default:
      return state;
  }
}