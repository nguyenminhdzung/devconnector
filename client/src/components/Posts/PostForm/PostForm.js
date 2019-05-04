import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {addPost} from "../../../store/actions";
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup/TextAreaFieldGroup';
import {onChange} from "../../../share/inputHandler";


class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
    this.onChange = onChange.bind(this);
  }

  onSubmit = e => {
    e.preventDefault();
    const {name, avatar} = this.props.auth.user;
    this.props.addPost({
      text: this.state.text,
      name,
      avatar
    });
    this.setState(() => ({text: ''}));
  };

  render() {
    const {errors} = this.props.post;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Say Something...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup onChange={this.onChange} value={this.state.text} name='text'
                                    placeholder='Create a post' error={errors.text}/>
              </div>
              <button type="submit" className="btn btn-dark">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  };
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
});

const mapDispatchToProps = dispatch => ({
  addPost: payload => dispatch(addPost(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);