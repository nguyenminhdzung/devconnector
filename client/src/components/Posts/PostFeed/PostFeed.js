import React from 'react';
import PropTypes from 'prop-types';

import PostItem from './PostItem/PostItem';
import {deletePost, likePost, unlikePost} from "../../../store/actions";
import {connect} from "react-redux";


class PostFeed extends React.Component {
  deletePost = id => {
    this.props.deletePost(id);
  };

  likePost = id => {
    this.props.likePost(id);
  };

  unlikePost = id => {
    this.props.unlikePost(id);
  };

  renderPost = post => <PostItem key={post._id} post={post} onDelete={this.deletePost}
                                 onLike={this.likePost}
                                 onUnlike={this.unlikePost}/>;

  render() {
    const {posts} = this.props;
    return posts.map(this.renderPost);
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(deletePost(id)),
  likePost: id => dispatch(likePost(id)),
  unlikePost: id => dispatch(unlikePost(id)),
});

export default connect(null, mapDispatchToProps)(PostFeed);