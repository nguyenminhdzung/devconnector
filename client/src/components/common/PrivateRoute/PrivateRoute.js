import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class PrivateRoute extends React.Component {
  render() {
    const {component: Component, auth, ...rest} = this.props;
    return (
      <Route {...rest}
             render={props => (auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/login"/>)}/>
    )
  };
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
