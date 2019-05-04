import {combineEpics} from 'redux-observable';
import * as authEpic from './authEpic';
import * as profileEpic from './profileEpic';
import * as profilesEpic from './profilesEpic';
import * as postEpic from './postEpic';
import * as postsEpic from './postsEpic';

export default combineEpics(
  authEpic.registerUserEpic,
  authEpic.loginUserEpic,
  authEpic.logoutEpic,
  authEpic.tryAutoLogin,
  profileEpic.fetchProfile,
  profileEpic.createProfile,
  profileEpic.editProfile,
  profileEpic.deleteAccount,
  profileEpic.addExperience,
  profileEpic.addEducation,
  profileEpic.deleteExperience,
  profileEpic.deleteEducation,
  profileEpic.fetchProfileByHandle,
  profilesEpic.fetchProfiles,
  postEpic.fetchPost,
  postEpic.addPost,
  postsEpic.fetchPosts,
  postsEpic.deletePost,
  postsEpic.likePost,
  postsEpic.unlikePost,
);
