import {
  CLEAN_CURRENT_PROFILE,
  CREATE_PROFILE,
  CREATE_PROFILE_FAIL,
  CREATE_PROFILE_START,
  CREATE_PROFILE_SUCCESS,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_FAIL,
  DELETE_ACCOUNT_START,
  DELETE_ACCOUNT_SUCCESS,
  EDIT_PROFILE,
  FETCH_PROFILE,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_NOT_FOUND,
  FETCH_PROFILE_START,
  FETCH_PROFILE_SUCCESS,
  ADD_EXPERIENCE,
  ADD_EXPERIENCE_SUCCESS,
  ADD_EXPERIENCE_FAIL,
  ADD_EXPERIENCE_START,
  ADD_EDUCATION,
  ADD_EDUCATION_SUCCESS,
  ADD_EDUCATION_FAIL,
  ADD_EDUCATION_START,
  DELETE_EXPERIENCE,
  DELETE_EXPERIENCE_START,
  DELETE_EXPERIENCE_SUCCESS,
  DELETE_EXPERIENCE_FAIL,
  DELETE_EDUCATION,
  DELETE_EDUCATION_START,
  DELETE_EDUCATION_SUCCESS,
  DELETE_EDUCATION_FAIL, FETCH_PROFILE_BY_HANDLE,

} from './types';

export const fetchProfile = () => ({
  type: FETCH_PROFILE,
});

export const fetchProfileStart = () => ({
  type: FETCH_PROFILE_START,
});

export const fetchProfileSuccess = profile => ({
  type: FETCH_PROFILE_SUCCESS,
  profile
});

export const fetchProfileFail = errors => ({
  type: FETCH_PROFILE_FAIL,
  errors
});

export const fetchProfileNotFound = () => ({
  type: FETCH_PROFILE_NOT_FOUND
});

export const clearCurrentProfile = () => ({
  type: CLEAN_CURRENT_PROFILE
});

export const createProfileStart = () => ({
  type: CREATE_PROFILE_START
});

export const createProfileFail = errors => ({
  type: CREATE_PROFILE_FAIL,
  errors
});

export const createProfileSuccess = profile => ({
  type: CREATE_PROFILE_SUCCESS,
  profile
});

export const createProfile = (payload, history) => ({
  type: CREATE_PROFILE,
  payload, history
});

export const editProfile = (payload, history) => ({
  type: EDIT_PROFILE,
  payload,
  history
})

export const deleteAccount = () => ({
  type: DELETE_ACCOUNT,
});

export const deleteAccountSuccess = () => ({
  type: DELETE_ACCOUNT_SUCCESS
});

export const deleteAccountFail = errors => ({
  type: DELETE_ACCOUNT_FAIL,
  errors,
});

export const deleteAccountStart = () => ({
  type: DELETE_ACCOUNT_START
});

export const addExperience = (payload, history) => ({
  type: ADD_EXPERIENCE,
  payload,
  history
});

export const addExperienceSuccess = profile => ({
  type: ADD_EXPERIENCE_SUCCESS,
  profile
});

export const addExperienceFail = errors => ({
  type: ADD_EXPERIENCE_FAIL,
  errors,
});

export const addExperienceStart = () => ({
  type: ADD_EXPERIENCE_START
});

export const addEducation = (payload, history) => ({
  type: ADD_EDUCATION,
  payload,
  history
});

export const addEducationSuccess = profile => ({
  type: ADD_EDUCATION_SUCCESS,
  profile
});

export const addEducationFail = errors => ({
  type: ADD_EDUCATION_FAIL,
  errors,
});

export const addEducationStart = () => ({
  type: ADD_EDUCATION_START
});

export const deleteExperience = id => ({
  type: DELETE_EXPERIENCE,
  id,
});

export const deleteExperienceStart = () => ({
  type: DELETE_EXPERIENCE_START,
});

export const deleteExperienceSuccess = profile => ({
  type: DELETE_EXPERIENCE_SUCCESS,
  profile
});

export const deleteExperienceFail = errors => ({
  type: DELETE_EXPERIENCE_FAIL,
  errors,
});

export const deleteEducation = id => ({
  type: DELETE_EDUCATION,
  id,
});

export const deleteEducationStart = () => ({
  type: DELETE_EDUCATION_START,
});

export const deleteEducationSuccess = profile => ({
  type: DELETE_EDUCATION_SUCCESS,
  profile
});

export const deleteEducationFail = errors => ({
  type: DELETE_EDUCATION_FAIL,
  errors,
});

export const fetchProfileByHandle = handle => ({
  type: FETCH_PROFILE_BY_HANDLE,
  handle
});



