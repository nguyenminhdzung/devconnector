import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import PrivateRoute from './components/common/PrivateRoute/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';
import * as actions from './store/actions/index';
import Dashboard from './components/Dashboard/Dashboard';
import CreateProfile from './components/CreateProfile/CreateProfile';
import EditProfile from "./components/EditProfile/EditProfile";
import AddExperience from './components/AddCredentials/AddExperience/AddExperience';
import AddEducation from './components/AddCredentials/AddEducation/AddEducation';
import Profiles from './components/Profiles/Profiles';
import Profile from './components/Profiles/Profile/Profile';
import NotFound from './components/NotFound/NotFound';
import Posts from './components/Posts/Posts';
import Post from './components/Post/Post';

class App extends Component {
  constructor(props) {
    super(props);
    this.props.onTryAutoLogin();
  }

  render() {
    if (!this.props.tryLogin) {
      return null;
    }
    return (
      <div>
        <Navbar/>
        <div className="container">
          <Switch>
            <Route path="/login" component={Login} exact/>
            <Route path="/register" component={Register} exact/>
            <Route path="/profiles" component={Profiles} exact/>
            <Route path='/profile/:handle' component={Profile} exact/>
            <Route path='/post/:id' component={Post} exact/>
            <PrivateRoute path="/dashboard" component={Dashboard} exact/>
            <PrivateRoute path="/create-profile" component={CreateProfile} exact/>
            <PrivateRoute path="/edit-profile" component={EditProfile} exact/>
            <PrivateRoute path="/add-experience" component={AddExperience} exact/>
            <PrivateRoute path="/add-education" component={AddEducation} exact/>
            <PrivateRoute path='/feed' component={Posts}/>
            <Route path="/" exact component={Landing}/>
            <Route exact path='/not-found' component={NotFound}/>
            <Redirect to='/not-found'/>
          </Switch>
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  tryLogin: state.auth.tryLogin
});

const mapDispatchToProps = dispatch => ({
  onTryAutoLogin: () => dispatch(actions.loginAuto())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
