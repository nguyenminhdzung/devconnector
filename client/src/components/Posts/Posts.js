import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchPosts} from '../../store/actions/index';
import PostForm from './PostForm/PostForm';
import PostFeed from './PostFeed/PostFeed';
import Spinner from "../common/Spinner/Spinner";

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const {posts = [], loading} = this.props.posts;
    const postContent = loading ? <Spinner/> : <PostFeed posts={posts}/>


    return (
      <div className='feed'>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm/>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.object.isRequired,
  fetchPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  posts: state.posts
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => dispatch(fetchPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);