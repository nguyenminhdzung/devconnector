import {
  ADD_POST_FAIL,
  ADD_POST_START,
  ADD_POST_SUCCESS,
  FETCH_POST_FAIL,
  FETCH_POST_START,
  FETCH_POST_SUCCESS
} from "../actions/types";

const initialState = {
  post: {},
  loading: false,
  errors: {},
};

const fetchPostStart = (state, action) => ({
  ...state,
  loading: true,
  post: {},
  errors: {},
});

const fetchPostSuccess = (state, action) => ({
  ...state,
  loading: false,
  post: action.post,
  errors: {}
});

const fetchPostFail = (state, action) => ({
  ...state,
  loading: false,
  post: {},
  errors: action.errors
});

const addPostStart = (state, action) => ({
  ...state,
  loading: true,
  post: {},
  errors: {},
});

const addPostSuccess = (state, action) => ({
  ...state,
  loading: false,
  post: action.post,
  errors: {}
});

const addPostFail = (state, action) => ({
  ...state,
  loading: false,
  post: {},
  errors: action.errors
});


export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST_START:
      return fetchPostStart(state, action);
    case FETCH_POST_SUCCESS:
      return fetchPostSuccess(state, action);
    case FETCH_POST_FAIL:
      return fetchPostFail(state, action);
    case ADD_POST_START:
      return addPostStart(state, action);
    case ADD_POST_SUCCESS:
      return addPostSuccess(state, action);
    case ADD_POST_FAIL:
      return addPostFail(state, action);
    default:
      return state;
  }
}