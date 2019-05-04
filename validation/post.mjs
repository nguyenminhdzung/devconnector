import validator from 'validator';

export default data => {
  const errors = {};
  if (!data.text || validator.isEmpty(data.text)) {
    errors.text = 'Text is requried';
  }

  if (!errors.text && !validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Post must be between 10 and 300 characters';
  }

  errors.isValid = Object.keys(errors).length === 0;

  return errors;
};
