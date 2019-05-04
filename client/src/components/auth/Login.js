import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter, Redirect} from 'react-router-dom';

import {loginUser} from '../../store/actions/index';
import {onChange} from '../../share/inputHandler';
import TextFieldGroup from '../common/TextFieldGroup/TextFieldGroup';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = onChange.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();
    const {email, password} = this.state;
    const user = {email, password};
    this.props.onSubmit(user, this.props.history);
  };


  render() {
    const {errors} = this.props;
    return (
      <>
        {this.props.auth.isAuthenticated ? <Redirect to='/dashboard'/> : null}
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your DevConnector account</p>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    type="email"
                    error={errors.email}
                    placeholder="Email Address"
                    name="email"
                    onChange={this.onChange}
                    value={this.state.email}
                  />
                  <TextFieldGroup
                    type="password"
                    error={errors.password}
                    placeholder="Password"
                    name="password"
                    onChange={this.onChange}
                    value={this.state.password}
                  />
                  <input type="submit" className="btn btn-info btn-block mt-4"/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: {user: state.auth.user, isAuthenticated: state.auth.isAuthenticated},
  errors: state.auth.errors
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (user, history) => dispatch(loginUser(user, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
