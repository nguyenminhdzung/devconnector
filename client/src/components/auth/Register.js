import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { registerUser } from '../../store/actions/auth';
import { onChange } from '../../share/inputHandler';
import TextFieldGroup from '../common/TextFieldGroup/TextFieldGroup';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };
    this.onChange = onChange.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = this.state;
    const newUser = { name, email, password, confirmPassword };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors, isAuthenticated } = this.props;

    if (isAuthenticated) {
      this.props.history.push('/dashboard');
    }

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup error={errors.email} placeholder="Name" name="name" onChange={this.onChange} value={this.state.name} />
                <TextFieldGroup
                  type="email"
                  error={errors.email}
                  placeholder="Email Address"
                  name="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  type="password"
                  error={errors.password}
                  placeholder="Password"
                  name="password"
                  onChange={this.onChange}
                  value={this.state.password}
                />
                <TextFieldGroup
                  type="password"
                  error={errors.confirmPassword}
                  placeholder="Confirm password"
                  name="confirmPassword"
                  onChange={this.onChange}
                  value={this.state.confirmPassword}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth.user,
  errors: state.auth.errors
});

const mapDispatchToProps = dispatch => ({
  registerUser: (user, history) => dispatch(registerUser(user, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
