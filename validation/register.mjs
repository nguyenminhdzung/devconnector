import validator from 'validator';

export default data => {
  const errors = {};

  const ignoreWhitespaceOption = { ignore_whitespace: true };
  if (!data.name || validator.isEmpty(data.name, ignoreWhitespaceOption)) {
    errors.name = 'Name is requried';
  }

  if (!errors.name && !validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (!data.email || validator.isEmpty(data.email, ignoreWhitespaceOption)) {
    errors.email = 'Email is requried';
  }

  if (!errors.email && !validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (!data.password || validator.isEmpty(data.password, ignoreWhitespaceOption)) {
    errors.password = 'Password is requried';
  }

  if (!errors.password && !validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 and less than 30 characters';
  }

  if (!data.confirmPassword || validator.isEmpty(data.confirmPassword, ignoreWhitespaceOption)) {
    errors.confirmPassword = 'Confirm password is requried';
  }

  if (!errors.confirmPassword && !validator.equals(data.confirmPassword, data.password)) {
    errors.confirmPassword = 'Passwords must match';
  }

  errors.isValid = Object.keys(errors).length === 0;

  return errors;
};
