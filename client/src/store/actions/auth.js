import {
  REGISTER_START,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  REGISTER_USER,
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_START,
  LOGIN_AUTO,
  LOGOUT,
  LOGOUT_SUCCESS
} from './types';

export const registerStart = () => ({
  type: REGISTER_START
});

export const registerSuccess = user => ({
  type: REGISTER_SUCCESS,
  user
});

export const registerFail = errors => ({
  type: REGISTER_FAIL,
  errors
});

export const registerUser = (payload, history) => {
  return {
    type: REGISTER_USER,
    payload,
    history
  };
};

export const loginSuccess = decodedToken => ({
  type: LOGIN_SUCCESS,
  payload: decodedToken
});

export const loginFail = errors => ({
  type: LOGIN_FAIL,
  errors
});

export const loginUser = (payload, history) => ({
  type: LOGIN_USER,
  payload,
  history
});

export const loginStart = () => ({
  type: LOGIN_START
});

export const loginAuto = () => ({
  type: LOGIN_AUTO
});

export const logout = () => ({
  type: LOGOUT,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});
