import {ofType} from "redux-observable";
import {FETCH_PROFILES} from "../actions/types";
import {catchError, map, mergeMap, startWith} from "rxjs/operators";
import {Axios as axios} from "axios-observable";
import * as actions from "../actions";
import {of} from "rxjs";

export const fetchProfiles = action$ => action$.pipe(
  ofType(FETCH_PROFILES),
  mergeMap(() =>
    axios.get('/api/profile/all').pipe(
      map(res => actions.fetchProfilesSuccess(res.data)),
      catchError(res => {
        return of(actions.fetchProfilesFail(res.response.data.errors));
      }),
      startWith(actions.fetchProfilesStart())
    )
  ),
);
