import validator from 'validator';

export default data => {
  const errors = {};
  if (!data.school || validator.isEmpty(data.school)) {
    errors.school = 'School field is required';
  }

  if (!data.degree || validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  }

  if (!data.fieldOfStudy || validator.isEmpty(data.fieldOfStudy)) {
    errors.fieldOfStudy = 'Field of study is required';
  }

  if (!data.from || validator.isEmpty(data.from)) {
    errors.from = 'From field is required';
  }

  errors.isValid = Object.keys(errors).length === 0;
  return errors;
};
