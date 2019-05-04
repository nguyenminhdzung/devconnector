import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import {onChange} from '../../../share/inputHandler';
import TextFieldGroup from '../../common/TextFieldGroup/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup/TextAreaFieldGroup';
import {addEducation} from '../../../store/actions/index';

class AddEducation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      school: '',
      degree: '',
      fieldOfStudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    };

    this.onChange = onChange.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();
    const {school, degree, fieldOfStudy, from, to, current, description} = this.state;
    const education = {school, degree, fieldOfStudy, from, to, current, description};
    this.props.addEducation(education, this.props.history);
  };

  onCheck = () => {
    this.setState(prevState => ({
      disabled: !prevState.disabled,
      current: !prevState.current,
    }))
  };

  render() {
    const {errors} = this.props.profile;

    return (
      <div className='add-education'>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to='/dashboard' className='btn btn-light'>Go Back</Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup onChange={this.onChange} value={this.state.school} name='school'
                                placeholder='* School' error={errors.school}/>
                <TextFieldGroup onChange={this.onChange} value={this.state.degree} name='degree'
                                placeholder='* Degree or Certification'
                                error={errors.degree}/>
                <TextFieldGroup onChange={this.onChange} value={this.state.fieldOfStudy} name='fieldOfStudy'
                                placeholder='* Field of study' error={errors.fieldOfStudy}/>
                <h6>From Date</h6>
                <TextFieldGroup onChange={this.onChange} value={this.state.from} name='from' type='date'
                                error={errors.from}/>
                <h6>To Date</h6>
                <TextFieldGroup onChange={this.onChange} value={this.state.to} name='to' type='date'
                                disabled={this.state.disabled ? 'disabled' : ''} error={errors.to}/>
                <div className="form-check mb-4">
                  <input id='current' type="checkbox" className="form-check-input" name='current'
                         value={this.state.current} checked={this.state.current} onChange={this.onCheck}/>
                  <label htmlFor="current" className="form-check-label">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup onChange={this.onChange} value={this.state.description} name='description'
                                    placeholder='Program description' error={errors.description}
                                    info={'Tell us about the program that you were in'}/>
                <input type="submit" value='Submit' className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  addEducation: (payload, history) => dispatch(addEducation(payload, history)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEducation));