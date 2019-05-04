import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import {onChange} from '../../../share/inputHandler';
import TextFieldGroup from '../../common/TextFieldGroup/TextFieldGroup';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup/TextAreaFieldGroup';
import {addExperience} from '../../../store/actions/index';

class AddExperience extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      title: '',
      location: '',
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
    const {company, title, location, from, to, current, description} = this.state;
    const experience = {company, title, location, from, to, current, description};
    this.props.addExperience(experience, this.props.history);
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
      <div className='add-experience'>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to='/dashboard' className='btn btn-light'>Go Back</Link>
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">Add any job or position that you have had in the pass or current</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup onChange={this.onChange} value={this.state.company} name='company'
                                placeholder='* Company' error={errors.company}/>
                <TextFieldGroup onChange={this.onChange} value={this.state.title} name='title' placeholder='* Job Title'
                                error={errors.title}/>
                <TextFieldGroup onChange={this.onChange} value={this.state.location} name='location'
                                placeholder='Location' error={errors.location}/>
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
                                    placeholder='Job description' error={errors.description}
                                    info={'Tell us about the position'}/>
                <input type="submit" value='Submit' className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  addExperience: (payload, history) => dispatch(addExperience(payload, history)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddExperience));