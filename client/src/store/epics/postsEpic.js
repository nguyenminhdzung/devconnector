import {ofType} from "redux-observable";
import {Axios as axios} from 'axios-observable';
import {concat, of} from "rxjs";

import * as actions from '../actions/index';
import {DELETE_POST, FETCH_POSTS, LIKE_POST, UNLIKE_POST} from "../actions/types";
import {catchError, map, mergeMap, startWith} from 'rxjs/operators';

export const fetchPosts = action$ => action$.pipe(
  ofType(FETCH_POSTS),
  mergeMap(() => axios.get('/api/posts').pipe(
    map(res => actions.fetchPostsSuccess(res.data)),
    catchError(res => of(actions.fetchPostsFail(res.response.data.errors))),
    startWith(actions.fetchPostsStart()),
  )),
);

export const deletePost = action$ => action$.pipe(
  ofType(DELETE_POST),
  mergeMap(({id}) => axios.delete(`/api/posts/${id}`).pipe(
    mergeMap(res => concat(of(actions.deletePostSuccess(id)), of(actions.fetchPosts()))),
    catchError(res => of(actions.deletePostFail(res.response.data.errors))),
    startWith(actions.deletePostStart()),
  )),
);

export const likePost = action$ => action$.pipe(
  ofType(LIKE_POST),
  mergeMap(({id}) => axios.put(`/api/posts/like/${id}`).pipe(
    mergeMap(res => concat(of(actions.likePostSuccess(id)), of(actions.fetchPosts()))),
    catchError(res => of(actions.likePostFail(res.response.data.errors))),
    startWith(actions.likePostStart()),
  )),
);


export const unlikePost = action$ => action$.pipe(
  ofType(UNLIKE_POST),
  mergeMap(({id}) => axios.put(`/api/posts/unlike/${id}`).pipe(
    mergeMap(res => concat(of(actions.unlikePostSuccess(id)), of(actions.fetchPosts()))),
    catchError(res => of(actions.unlikePostFail(res.response.data.errors))),
    startWith(actions.unlikePostStart()),
  )),
);