import validator from 'validator';

export default data => {
  const errors = {};
  if (!data.email || validator.isEmpty(data.email)) {
    errors.email = 'Email is requried';
  }

  if (!errors.email && !validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (!data.password || validator.isEmpty(data.password)) {
    errors.password = 'Password is requried';
  }

  if (!errors.password && !validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 and less than 30 characters';
  }

  errors.isValid = Object.keys(errors).length === 0;
  return errors;
};
