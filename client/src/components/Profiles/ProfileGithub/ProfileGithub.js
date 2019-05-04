import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Axios as axios} from 'axios-observable';

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '88b9cb73ce6fbab05ad8',
      clientSecret: '5e58f1e6ef1077330214998ce47dee66f5846c0b',
      count: 5,
      sort: 'create:asc',
      repos: [],
    };
  }

  componentDidMount() {
    const {username} = this.props;
    const {count, sort, clientId, clientSecret} = this.state;
    axios.get(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
      .subscribe(res => this.setState({repos: res.data}), error => console.log(error));

  }

  render() {
    if (!this.props.profile.profile) {
      this.props.history.push('/not-found');
    }
    const {repos} = this.state;
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link className="text-info" to={repo.html_url} target='_blank' rel="noopener noreferrer">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success mr-1">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <hr/>
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfileGithub;