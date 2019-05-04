import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {Link} from 'react-router-dom';

class PostItem extends React.PureComponent {
  onDelete = () => {
    this.props.onDelete(this.props.post._id);
  };

  onLike = () => {
    this.props.onLike(this.props.post._id);
  };

  onUnlike = () => {
    this.props.onUnlike(this.props.post._id);
  };

  findUserLike = (likes = []) => {
    const {auth} = this.props;

    return likes.filter(like => like.user === auth.user.id).length > 0;
  };

  render() {
    const {post, auth, showActions = true} = this.props;
    const {likes = []} = post;
    const action = showActions
      ? (
        <>
          <button type="button" onClick={this.onLike} className="btn btn-light mr-1">
            <i className={classnames('fas fa-thumbs-up', {
              'text-info': this.findUserLike(likes)
            })}></i>
            <span className="badge badge-light">{likes.length}</span>
          </button>
          <button type='button' onClick={this.onUnlike} className="btn btn-light mr-1">
            <i className="text-secondary fas fa-thumbs-down"></i>
          </button>
          <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
            Comments
          </Link>
          {post.user === auth.user.id ?
            <button onClick={this.onDelete}
                    className="btn btn-danger mr-1">
              <i className="fas fa-times"/>
            </button>

            : null}
        </>
      ) : null;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to="/profile">
              <img className="rounded-circle d-none d-md-block"
                   src={post.avatar}
                   alt=""/>
            </Link>
            <br/>
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {action}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PostItem);