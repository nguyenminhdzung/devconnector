import {
    LOGIN_FAIL,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_START,
    REGISTER_SUCCESS,
} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: {},
    errors: {},
    tryLogin: false,
};

const registerStart = (state, action) => ({
    ...state
});

const registerSuccess = (state, action) => ({
    ...state
});

const registerFail = (state, action) => ({
    ...state,
    errors: action.errors
});

const loginStart = (state, action) => ({
    ...state
});

const loginSuccess = (state, action) => ({
    ...state,
    isAuthenticated: !!action.payload || Object.keys(action.payload).length === 0,
    user: action.payload,
    tryLogin: true
});

const loginFail = (state, action) => ({
    ...state,
    errors: action.errors,
    tryLogin: true
});

const logoutSuccess = (state, action) => ({
    ...state,
    user: {},
    errors: {},
    isAuthenticated: false,
    tryLogin: true
});

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_START:
            return registerStart(state, action);
        case REGISTER_FAIL:
            return registerFail(state, action);
        case REGISTER_SUCCESS:
            return registerSuccess(state, action);
        case LOGIN_START:
            return loginStart(state, action);
        case LOGIN_SUCCESS:
            return loginSuccess(state, action);
        case LOGIN_FAIL:
            return loginFail(state, action);
        case LOGOUT_SUCCESS:
            return logoutSuccess(state, action);
        default:
            return state;
    }
};
