import {
  ADD_EDUCATION_FAIL,
  ADD_EDUCATION_START,
  ADD_EDUCATION_SUCCESS,
  ADD_EXPERIENCE_FAIL,
  ADD_EXPERIENCE_START,
  ADD_EXPERIENCE_SUCCESS,
  CLEAN_CURRENT_PROFILE,
  CREATE_PROFILE_FAIL,
  CREATE_PROFILE_START,
  CREATE_PROFILE_SUCCESS,
  DELETE_ACCOUNT_FAIL,
  DELETE_ACCOUNT_START,
  DELETE_ACCOUNT_SUCCESS, DELETE_EDUCATION_FAIL,
  DELETE_EDUCATION_START, DELETE_EDUCATION_SUCCESS,
  DELETE_EXPERIENCE_FAIL,
  DELETE_EXPERIENCE_START,
  DELETE_EXPERIENCE_SUCCESS,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_NOT_FOUND,
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS
} from '../actions/types';

const initialState = {
  profile: null,
  loading: false,
  errors: {},
};

const fetchProfileStart = (state, action) => ({
  ...state,
  loading: true
});

const fetchProfileSuccess = (state, action) => ({
  ...state,
  loading: false,
  profile: action.profile
});

const fetchProfileFail = (state, action) => ({
  ...state,
  loading: false,
  profile: {}
});

const fetchProfileNotFound = (state, action) => ({
  ...state,
  loading: false,
  profile: {},
});

const clearCurrentProfile = (state, action) => ({
  ...state,
  loading: false,
  profile: null
});

const createProfileStart = (state, action) => ({
  ...state,
  loading: true,
  errors: {}
});

const createProfileSuccess = (state, action) => ({
  ...state,
  loading: false,
  profile: action.profile,
  errors: {},
});

const createProfileFail = (state, action) => ({
  ...state,
  loading: false,
  profile: {},
  errors: action.errors
});

const deleteAccountStart = (state, action) => ({
  ...state,
  loading: true,
  errors: {}
});

const deleteAccountSuccess = (state, action) => ({
  ...state,
  loading: false,
  profile: {},
  errors: {}
});

const deleteAccountFail = (state, action) => ({
  ...state,
  loading: false,
  profile: {},
  errors: action.errors,
});

const addExperienceStart = (state, action) => ({
  ...state,
  loading: true,
  errors: {},
});

const addExperienceSuccess = (state, action) => ({
  ...state,
  loading: false,
  profile: action.profile,
});

const addExperienceFail = (state, action) => ({
  ...state,
  loading: false,
  profile: {},
  errors: action.errors,
});

const addEducationStart = (state, action) => ({
  ...state,
  loading: true,
  errors: {},
});

const addEducationSuccess = (state, action) => ({
  ...state,
  loading: false,
  profile: action.profile,
});

const addEducationFail = (state, action) => ({
  ...state,
  loading: false,
  profile: {},
  errors: action.errors,
});

const deleteExperienceStart = (state, action) => ({
  ...state,
  loading: true,
  errors: {},
});

const deleteExperienceSuccess = (state, action) => ({
  ...state,
  loading: false,
  errors: {},
  profile: action.profile
});

const deleteExperienceFail = (state, action) => ({
  ...state,
  loading: false,
  errors: action.errors,
  profile: {},
});

const deleteEducationStart = (state, action) => ({
  ...state,
  loading: true,
  errors: {},
});

const deleteEducationSuccess = (state, action) => ({
  ...state,
  loading: false,
  errors: {},
  profile: action.profile
});

const deleteEducationFail = (state, action) => ({
  ...state,
  loading: false,
  errors: action.errors,
  profile: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_START:
      return fetchProfileStart(state, action);
    case FETCH_PROFILE_SUCCESS:
      return fetchProfileSuccess(state, action);
    case FETCH_PROFILE_FAIL:
      return fetchProfileFail(state, action);
    case FETCH_PROFILE_NOT_FOUND:
      return fetchProfileNotFound(state, action);
    case CLEAN_CURRENT_PROFILE:
      return clearCurrentProfile(state, action);
    case CREATE_PROFILE_START:
      return createProfileStart(state, action);
    case CREATE_PROFILE_SUCCESS:
      return createProfileSuccess(state, action);
    case CREATE_PROFILE_FAIL:
      return createProfileFail(state, action);
    case DELETE_ACCOUNT_START:
      return deleteAccountStart(state, action);
    case DELETE_ACCOUNT_SUCCESS:
      return deleteAccountSuccess(state, action);
    case DELETE_ACCOUNT_FAIL:
      return deleteAccountFail(state, action);
    case ADD_EXPERIENCE_START:
      return addExperienceStart(state, action);
    case ADD_EXPERIENCE_SUCCESS:
      return addExperienceSuccess(state, action);
    case ADD_EXPERIENCE_FAIL:
      return addExperienceFail(state, action);
    case ADD_EDUCATION_START:
      return addEducationStart(state, action);
    case ADD_EDUCATION_SUCCESS:
      return addEducationSuccess(state, action);
    case ADD_EDUCATION_FAIL:
      return addEducationFail(state, action);
    case DELETE_EXPERIENCE_START:
      return deleteExperienceStart(state, action);
    case DELETE_EXPERIENCE_SUCCESS:
      return deleteExperienceSuccess(state, action);
    case DELETE_EXPERIENCE_FAIL:
      return deleteExperienceFail(state, action);
    case DELETE_EDUCATION_START:
      return deleteEducationStart(state, action);
    case DELETE_EDUCATION_SUCCESS:
      return deleteEducationSuccess(state, action);
    case DELETE_EDUCATION_FAIL:
      return deleteEducationFail(state, action);
    default:
      return state;
  }
};