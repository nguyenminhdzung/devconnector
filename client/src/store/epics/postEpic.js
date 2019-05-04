import {ofType} from "redux-observable";
import {FETCH_POST, ADD_POST} from "../actions/types";
import {Axios as axios} from "axios-observable";
import * as actions from '../actions/index';
import {map, catchError, mergeMap, startWith} from "rxjs/operators";
import {concat, of} from "rxjs";

export const fetchPost = action$ => action$.pipe(
  ofType(FETCH_POST),
  mergeMap(({id}) => axios.get(`/api/posts/${id}`).pipe(
    map(res => actions.fetchPostSuccess(res.data)),
    catchError(res => of(actions.fetchPostFail(res.response.data.errors))),
    startWith(actions.fetchPostStart()),
  )),
);

export const addPost = action$ => action$.pipe(
  ofType(ADD_POST),
  mergeMap(({payload}) => axios.post('/api/posts', payload).pipe(
    mergeMap(res => concat(of(actions.addPostSuccess(res.data)), of(actions.fetchPosts()))),
    catchError(res => of(actions.addPostFail(res.response.data.errors))),
    startWith(actions.addPostStart()),
  )),
);

