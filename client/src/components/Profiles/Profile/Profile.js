import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfileAbout from '../ProfileAbout/ProfileAbout';
import ProfileGithub from '../ProfileGithub/ProfileGithub';
import ProfileCreds from '../ProfileCreds/ProfileCreds';
import Spinner from '../../common/Spinner/Spinner';
import {fetchProfileByHandle} from '../../../store/actions/index';

const generateProfileContent = profile => (
  <div>
    <div className="row">
      <div className="col-md-6">
        <Link to='/profiles' className="btn btn-light mb-3 float-left">
          Back To Profiles
        </Link>
      </div>
      <div className="col-md-6"></div>
    </div>
    <ProfileHeader profile={profile}/>
    <ProfileAbout profile={profile}/>
    <ProfileCreds educations={profile.educations} experiences={profile.experiences}/>
    {profile.githubUsername ? <ProfileGithub username={profile.githubUsername}/> : null}
  </div>
);

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.fetchProfileByHandle(this.props.match.params.handle);
    }
  }


  render() {
    const {profile, loading} = this.props.profile;
    const profileContent = !profile || Object.keys(profile).length === 0 || loading ?
      <Spinner/> : generateProfileContent(profile);

    return (
      <div className='profiles'>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {profileContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  fetchProfileByHandle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  fetchProfileByHandle: handle => dispatch(fetchProfileByHandle(handle)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);