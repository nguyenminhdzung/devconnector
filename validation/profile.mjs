import validator from 'validator';

export default data => {
  const errors = {};
  if (!data.handle || validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  if (!errors.handle && !validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Profile handle needs to between 2 and 40 characters';
  }

  if (!data.status || validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }

  if (!data.skills || validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }

  if (!!data.website && !validator.isURL(data.website)) {
    errors.website = 'Website is invalid URL';
  }

  if (!!data.youtube && !validator.isURL(data.youtube)) {
    errors.youtube = 'Youtube link is invalid URL';
  }

  if (!!data.twitter && !validator.isURL(data.twitter)) {
    errors.twitter = 'Twitter link is invalid URL';
  }

  if (!!data.facebook && !validator.isURL(data.facebook)) {
    errors.facebook = 'Facebook link is invalid URL';
  }

  if (!!data.linkedin && !validator.isURL(data.linkedin)) {
    errors.linkedin = 'Linked In link is invalid URL';
  }

  if (!!data.instagram && !validator.isURL(data.instagram)) {
    errors.instagram = 'Instagram link is invalid URL';
  }

  errors.isValid = Object.keys(errors).length === 0;

  return errors;
};
