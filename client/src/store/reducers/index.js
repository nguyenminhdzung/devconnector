import {combineReducers} from 'redux';
import authReducer from './auth';
import profileReducer from './profile';
import profilesReducer from './profiles';
import postReducer from './post';
import postsReducer from './posts';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  profiles: profilesReducer,
  post: postReducer,
  posts: postsReducer
});
