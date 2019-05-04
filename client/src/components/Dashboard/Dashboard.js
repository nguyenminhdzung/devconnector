import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Spinner from '../common/Spinner/Spinner';
import {deleteAccount, fetchProfile} from "../../store/actions";
import ProfileAction from './ProfileAction/ProfileAction';
import Experience from './Experience/Experience';
import Education from './Education/Education';

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchProfile();
  }

  deleteAccountHandler = e => {
    if (window.confirm(`Are you sure? This can NOT be undone`)) {
      this.props.deleteAccount();
    }
  };

  displayProfile = (user, profile) => {
    if (Object.keys(profile).length === 0) {
      return (<div>
        <p className="lead text-muted">Welcome {user.name}</p>
        <p>You have not yet setup a profile, please add some info</p>
        <Link to='/create-profile' className="btn btn-lg btn-info">
          Create Profile
        </Link>
      </div>);
    }
    return (
      <div>
        <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link></p>
        <ProfileAction/>
        <Experience experiences={profile.experiences}/>
        <Education educations={profile.educations}/>
        <div style={{marginBottom: 60}}></div>
        <button onClick={this.deleteAccountHandler} className="btn btn-danger">Delete My Account</button>
      </div>
    );
  }

  render() {
    const {user} = this.props.auth;
    const {profile, loading} = this.props.profile;
    const dashboardContent = profile === null || loading ? <Spinner/> : this.displayProfile(user, profile);
    return (
      <div className='dashboard'>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  fetchProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => dispatch(fetchProfile()),
  deleteAccount: () => dispatch(deleteAccount())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);