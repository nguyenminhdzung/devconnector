import {FETCH_PROFILES_FAIL, FETCH_PROFILES_START, FETCH_PROFILES_SUCCESS} from "../actions/types";

const initialState = {
  profiles: [],
  loading: false
};

const fetchProfilesStart = (state, action) => ({
  ...state,
  loading: true,
  profiles: [],
});

const fetchProfilesSuccess = (state, action) => ({
  ...state,
  loading: false,
  profiles: action.profiles
});

const fetchProfilesFail = (state, action) => ({
  ...state,
  loading: false,
  profiles: [],
  errors: action.errors
});

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILES_START:
      return fetchProfilesStart(state, action);
    case FETCH_PROFILES_SUCCESS:
      return fetchProfilesSuccess(state, action);
    case FETCH_PROFILES_FAIL:
      return fetchProfilesFail(state, action);
    default:
      return state;
  }
}