import {
  FETCH_PROFILES, FETCH_PROFILES_FAIL, FETCH_PROFILES_START, FETCH_PROFILES_SUCCESS
} from "./types";

export const fetchProfiles = () => ({
  type: FETCH_PROFILES,
});

export const fetchProfilesStart = () => ({
  type: FETCH_PROFILES_START,
});

export const fetchProfilesSuccess = profiles => ({
  type: FETCH_PROFILES_SUCCESS,
  profiles
});

export const fetchProfilesFail = errors => ({
  type: FETCH_PROFILES_FAIL,
  errors
});
