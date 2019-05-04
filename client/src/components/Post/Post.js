import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

import {fetchPost} from "../../store/actions";
import Spinner from "../common/Spinner/Spinner";
import PostItem from "../Posts/PostFeed/PostItem/PostItem";

class Post extends Component {
  componentDidMount() {
    this.props.fetchPost(this.props.match.params.id);
  }

  renderPost = post => <PostItem showActions={false} key={post._id} post={post}/>;

  render() {
    const {post, loading} = this.props;
    const postContent = loading || Object.keys(post).length === 0 ? <Spinner/> : this.renderPost(post);

    return (
      <div className='post'>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link className="btn btn-light mb-3" to='/feed'>
                Back To Feed
              </Link>
              {postContent}
            </div>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post.post,
});

const mapDispatchToProps = dispatch => ({
  fetchPost: (id) => dispatch(fetchPost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);