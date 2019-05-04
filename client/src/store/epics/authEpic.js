import { ofType } from 'redux-observable';
import { mergeMap, startWith, map, catchError, tap } from 'rxjs/operators';
import { Axios as axios } from 'axios-observable';
import {concat, of} from 'rxjs';
import jwtDecode from 'jwt-decode';

import {REGISTER_USER, LOGIN_USER, LOGOUT, LOGIN_AUTO} from '../actions/types';
import * as actions from '../actions/index';
import setAuthToken from '../../utils/setAuthToken';

export const registerUserEpic = action$ => {
  return action$.pipe(
    ofType(REGISTER_USER),
    mergeMap(({ payload, history }) =>
      axios.post('/api/users/register', payload).pipe(
        tap(() => history.push('/login')),
        map(res => actions.registerSuccess(res.data)),
        catchError(res => {
          return of(actions.registerFail(res.response.data.errors));
        }),
        startWith(actions.registerStart())
      )
    )
  );
};

export const loginUserEpic = action$ => action$.pipe(
    ofType(LOGIN_USER),
    mergeMap(({ payload, history }) =>
      axios.post('/api/users/login', payload).pipe(
        map(res => res.data.token),
        tap(token => localStorage.setItem('token', token)),
        tap(token => setAuthToken(token)),
        map(token => jwtDecode(token)),
        map(decodeToken => actions.loginSuccess(decodeToken)),
        catchError(err => of(actions.loginFail(err.response.data.errors))),
        startWith(actions.loginStart())
      )
    )
  );

export const logoutEpic = action$ => action$.pipe(
  ofType(LOGOUT),
  tap(()=> setAuthToken()),
  tap(()=> localStorage.removeItem('token')),
  mergeMap(()=> concat(of(actions.logoutSuccess()), of(actions.clearCurrentProfile()))),
);

export const tryAutoLogin = action$ => action$.pipe(
  ofType(LOGIN_AUTO),
  map(()=> localStorage.getItem('token')),
  tap(token => setAuthToken(token)),
  map(token=> {
    if(!token){
      return actions.logout();
    }

    const decodeToken = jwtDecode(token);
    if(decodeToken.exp < Date.now()/1000){
      return actions.logout();
    }
    return actions.loginSuccess(decodeToken);
  })
);
