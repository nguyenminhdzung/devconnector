import React, {Component} from 'react';
import Moment from 'react-moment';

class ProfileCreds extends Component {
  render() {
    const {experiences, educations} = this.props;
    const experienceItems = experiences.map(experience => (
      <li key={experience._id} className='list-group-item'>
        <h4>{experience.company}</h4>
        <p>
          <Moment format='YYYY/MM/DD'>{experience.from}</Moment> -
          {experience.to ? <Moment format=' YYYY/MM/DD'>{experience.to}</Moment> : ' Now'}
        </p>
        <p><strong>Position:</strong> {experience.title}</p>
        <p>
          {experience.location ? <span><strong>Location: </strong> {experience.location}</span> : null}
        </p>
        <p>
          {experience.description ? <span><strong>Description: </strong> {experience.description}</span> : null}
        </p>
      </li>
    ));

    const educationItems = educations.map(education => (
      <li key={education._id} className='list-group-item'>
        <h4>{education.school}</h4>
        <p>
          <Moment format='YYYY/MM/DD'>{education.from}</Moment> -
          {education.to ? <Moment format='YYYY/MM/DD'>{education.to}</Moment> : ' Now'}
        </p>
        <p><strong>Degree:</strong> {education.degree}</p>
        <p><strong>Field Of Study:</strong> {education.fieldOfStudy}</p>
        <p>
          {education.description ? <span><strong>Description: </strong> {education.description}</span> : null}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {educations.length > 0
            ? (
              <ul className='list-group'>
                {experienceItems}
              </ul>
            )
            : <p className="text-center">No Experience Listed</p>}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {educations.length > 0
            ? (<ul className="list-group">
              {educationItems}
            </ul>)
            : <p className="text-center">No Education Listed</p>}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;