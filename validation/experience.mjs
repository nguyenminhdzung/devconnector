import validator from 'validator';

export default data => {
  const errors = {};
  if (!data.title || validator.isEmpty(data.title)) {
    errors.title = 'Job title field is required';
  }

  if (!data.company || validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }

  if (!data.from || validator.isEmpty(data.from)) {
    errors.from = 'From date field is required';
  }

  errors.isValid = Object.keys(errors).length === 0;
  return errors;
};
