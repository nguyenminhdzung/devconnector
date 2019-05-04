import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteExperience} from '../../../store/actions/index';


class Experience extends PureComponent {
    onDeleteClick = id => {
        this.props.deleteExperience(id);
    };

    mapExperienceToRender = exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>
            <td>
                <Moment format='YYYY/MM/DD'>{exp.from}</Moment>{` - `}
                {exp.to === null ? 'Now' : <Moment format='YYYY/MM/DD'>{exp.to}</Moment>}
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => this.onDeleteClick(exp._id)}>Delete</button>
            </td>
        </tr>
    );

    render() {
        const experiences = this.props.experiences.map(this.mapExperienceToRender);
        return (
            <div>
                <h4 className="mb_4">Experience Credentials</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {experiences}
                    </tbody>
                </table>
            </div>
        );
    }
}

Experience.propTypes = {
    experiences: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    deleteExperience: (id) => dispatch(deleteExperience(id)),
});

export default connect(null, mapDispatchToProps)(Experience);