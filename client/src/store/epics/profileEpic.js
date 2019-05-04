import {ofType} from 'redux-observable';
import {catchError, map, mergeMap, startWith, tap} from 'rxjs/operators';
import {Axios as axios} from 'axios-observable';
import {concat, of} from 'rxjs';

import {
  ADD_EDUCATION,
  ADD_EXPERIENCE,
  CREATE_PROFILE,
  DELETE_ACCOUNT, DELETE_EDUCATION, DELETE_EXPERIENCE,
  EDIT_PROFILE,
  FETCH_PROFILE, FETCH_PROFILE_BY_HANDLE
} from '../actions/types';
import * as actions from '../actions/index';

export const fetchProfile = action$ => action$.pipe(
  ofType(FETCH_PROFILE),
  mergeMap(() =>
    axios.get('/api/profile').pipe(
      map(res => actions.fetchProfileSuccess(res.data)),
      catchError(res => {
        if (res.response.status === 404) {
          return of(actions.fetchProfileNotFound());
        }
        return of(actions.fetchProfileFail(res.response.data.errors));
      }),
      startWith(actions.fetchProfileStart())
    )
  ),
);

export const createProfile = action$ => action$.pipe(
  ofType(CREATE_PROFILE),
  mergeMap(({payload, history}) => axios.post('/api/profile', payload).pipe(
    map(res => actions.createProfileSuccess(res.data)),
    tap(() => history.push('/dashboard')),
    catchError(res => of(actions.createProfileFail(res.response.data.errors))),
    startWith(actions.createProfileStart())
  ))
);

export const editProfile = action$ => action$.pipe(
  ofType(EDIT_PROFILE),
  mergeMap(({payload, history}) => axios.put('/api/profile', payload).pipe(
    map(res => actions.createProfileSuccess(res.data)),
    tap(() => history.push('/dashboard')),
    catchError(res => of(actions.createProfileFail(res.response.data.errors))),
    startWith(actions.createProfileStart())
  ))
)

export const deleteAccount = action$ => action$.pipe(
  ofType(DELETE_ACCOUNT),
  mergeMap(() => axios.delete('/api/profile').pipe(
    mergeMap(res => concat(
      of(actions.deleteAccountSuccess(res.data)),
      of(actions.logout()))),
    catchError(res => of(actions.deleteAccountFail(res.response.data.errors))),
    startWith(actions.deleteAccountStart())
  ))
);

export const addExperience = action$ => action$.pipe(
  ofType(ADD_EXPERIENCE),
  mergeMap(({payload, history}) => axios.post('/api/profile/experience', payload).pipe(
    map(res => actions.addExperienceSuccess(res.data)),
    tap(() => history.push('/dashboard')),
    catchError(res => of(actions.addExperienceFail(res.response.data.errors))),
    startWith(actions.addExperienceStart())
  ))
);

export const addEducation = action$ => action$.pipe(
  ofType(ADD_EDUCATION),
  mergeMap(({payload, history}) => axios.post('/api/profile/education', payload).pipe(
    map(res => actions.addEducationSuccess(res.data)),
    tap(() => history.push('/dashboard')),
    catchError(res => of(actions.addEducationFail(res.response.data.errors))),
    startWith(actions.addEducationStart())
  ))
);

export const deleteExperience = action$ => action$.pipe(
  ofType(DELETE_EXPERIENCE),
  mergeMap(({id}) => axios.delete(`/api/profile/experience/${id}`).pipe(
    map(res => actions.deleteExperienceSuccess(res.data)),
    catchError(res => of(actions.deleteExperienceFail(res.response.data.errors))),
    startWith(actions.deleteExperienceStart())
  ))
);

export const deleteEducation = action$ => action$.pipe(
  ofType(DELETE_EDUCATION),
  mergeMap(({id}) => axios.delete(`/api/profile/education/${id}`).pipe(
    map(res => actions.deleteEducationSuccess(res.data)),
    catchError(res => of(actions.deleteEducationFail(res.response.data.errors))),
    startWith(actions.deleteEducationStart())
  ))
);

export const fetchProfileByHandle = action$ => action$.pipe(
  ofType(FETCH_PROFILE_BY_HANDLE),
  mergeMap(({handle}) =>
    axios.get(`/api/profile/handle/${handle}`).pipe(
      map(res => actions.fetchProfileSuccess(res.data)),
      catchError(res => {
        if (res.response.status === 404) {
          return of(actions.fetchProfileNotFound());
        }
        return of(actions.fetchProfileFail(res.response.data.errors));
      }),
      startWith(actions.fetchProfileStart())
    )
  ),
);