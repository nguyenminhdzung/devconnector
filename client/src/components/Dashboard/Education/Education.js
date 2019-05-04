import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteEducation} from '../../../store/actions/index';


class Education extends PureComponent {
  onDeleteClick = id => {
    this.props.deleteEducation(id);
  };

  mapEducationToRender = edu => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment>{` - `}
        {edu.to === null ? 'Now' : <Moment format='YYYY/MM/DD'>{edu.to}</Moment>}
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => this.onDeleteClick(edu._id)}>Delete</button>
      </td>
    </tr>
  );

  render() {
    const educations = this.props.educations.map(this.mapEducationToRender);
    return (
      <div>
        <h4 className="mb_4">Education Credentials</h4>
        <table className="table">
          <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Year</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {educations}
          </tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  educations: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  deleteEducation: (id) => dispatch(deleteEducation(id)),
});

export default connect(null, mapDispatchToProps)(Education);