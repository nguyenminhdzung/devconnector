import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../common/Spinner/Spinner';
import ProfileItem from './ProfileItem/ProfileItem';
import {fetchProfiles} from "../../store/actions";

const generateProfileItems = (profiles = []) => {
  return profiles.length === 0 ? <h4>No profiles found...</h4> : profiles.map(profile => (
    <ProfileItem profile={profile} key={profile._id}/>));
};

class Profiles extends Component {
  componentDidMount() {

    this.props.fetchProfiles();
  }

  render() {
    const {profiles = [], loading} = this.props;
    console.log(this.props);
    const profileItems = loading ? <Spinner/> : generateProfileItems(profiles);
    return (
      <div className='profiles'>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  profiles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profiles: state.profiles.profiles,
  loading: state.profiles.loading,
});

const mapDispatchToProps = dispatch => ({
  fetchProfiles: () => dispatch(fetchProfiles()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);