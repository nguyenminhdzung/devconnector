import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, withRouter} from "react-router-dom";

import {onChange} from '../../share/inputHandler';
import TextFieldGroup from '../common/TextFieldGroup/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup/TextAreaFieldGroup';
import SelectListGroup from '../common/SelectListGroup/SelectListGroup';
import InputGroup from '../common/InputGroup/InputGroup';
import * as actions from '../../store/actions/index';


class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubUsername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
    };
    this.onChange = onChange.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();
    const {handle, company, website, location, status, skills, githubUsername, bio, twitter, facebook, linkedin, youtube, instagram} = this.state;
    const payload = {
      handle,
      company,
      website,
      location,
      status,
      skills,
      githubUsername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instagram
    };
    this.props.createProfile(payload, this.props.history);
  };

  options = [
    {label: '* Select Professional Status', value: 0},
    {label: 'Developer', value: 'Developer'},
    {label: 'Junior Developer', value: 'Junior Developer'},
    {label: 'Senior Developer', value: 'Senior Developer'},
    {label: 'Manager', value: 'Manager'},
    {label: 'Student or Learning', value: 'Student or Learning'},
    {label: 'Instructor or Teacher', value: 'Instructor or Teacher'},
    {label: 'Intern', value: 'Intern'},
    {label: 'Other', value: 'Other'},

  ];

  toggleDisplaySocialInput = () => {
    this.setState(prevState => ({displaySocialInputs: !prevState.displaySocialInputs}))
  }

  generateSocialInput = () => {
    const {errors} = this.props.profile;
    return (
      <div>
        <InputGroup
          placeholder='Twitter Profile URL'
          onChange={this.onChange}
          name='twitter'
          value={this.state.twitter}
          error={errors.twitter}
          icon='fab fa-twitter'/>
        <InputGroup
          placeholder='Facebook Page URL'
          onChange={this.onChange}
          name='facebook'
          value={this.state.facebook}
          error={errors.facebook}
          icon='fab fa-facebook'/>
        <InputGroup
          placeholder='Linkedin Profile URL'
          onChange={this.onChange}
          name='linkedin'
          value={this.state.linkedin}
          error={errors.linkedin}
          icon='fab fa-linkedin'/>
        <InputGroup
          placeholder='Youtuber Channel URL'
          onChange={this.onChange}
          name='youtube'
          value={this.state.youtube}
          error={errors.youtube}
          icon='fab fa-youtube'/>
        <InputGroup
          placeholder='Instagram Page URL'
          onChange={this.onChange}
          name='instagram'
          value={this.state.instagram}
          error={errors.instagram}
          icon='fab fa-instagram'/>
      </div>
    )
  }

  render() {
    const {displaySocialInputs} = this.state;
    const {errors} = this.props.profile;
    const socialInputs = displaySocialInputs ? this.generateSocialInput() : null;
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to='/dashboard' className='btn btn-light'>Go Back</Link>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">Let's get some information to make your profile stand
                out</p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder='* Profile Handle'
                  name='handle'
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info='A unique handle for your profile URL. Your full name, company name, nickname'
                />
                <SelectListGroup
                  placeholder='Status'
                  name='status'
                  value={this.state.status}
                  onChange={this.onChange}
                  error={errors.status}
                  info='Give us an idea of where you are at in your career'
                  options={this.options}/>
                <TextFieldGroup
                  placeholder='Company'
                  name='company'
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info='Could be your own company or one you work for'
                />
                <TextFieldGroup
                  placeholder='Website'
                  name='website'
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info='Could be your own website or a company one'
                />
                <TextFieldGroup
                  placeholder='Location'
                  name='location'
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info='City or city & state suggested (eg. Boston, MA)'
                />
                <TextFieldGroup
                  placeholder='Skills'
                  name='skills'
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info='Please use comma separated values (eg. HTML,CSS,JavaScript,PHP'
                />
                <TextFieldGroup
                  placeholder='Github Username'
                  name='githubUsername'
                  value={this.state.githubUsername}
                  onChange={this.onChange}
                  error={errors.githubUsername}
                  info='If you want your latest repos and a Github link, include your username'
                />
                <TextAreaFieldGroup
                  placeholder='Short Bio'
                  name='bio'
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info='Tell us a little about yourself'
                />
                <div className="mb-3">
                  <button className="btn btn-light" type='button'
                          onClick={this.toggleDisplaySocialInput}>
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>

                </div>
                {socialInputs}
                <input type="submit" value='Submit' className='btn btn-info btn-block mt-4'/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  createProfile: (payload, history) => dispatch(actions.createProfile(payload, history))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateProfile));
