import profileValidator from './profile.mjs';

test('Empty handle', () => {
  expect(profileValidator({})).toEqual({
    handle: 'Profile handle is required',
    skills: 'Skills field is required',
    status: 'Status field is required',
    isValid: false
  });
});

test('Invalid handle', () => {
  expect(profileValidator({ handle: 'a' })).toEqual({
    handle: 'Profile handle needs to between 2 and 40 characters',
    skills: 'Skills field is required',
    status: 'Status field is required',
    isValid: false
  });

  expect(profileValidator({ handle: 'asfasdlfjals;dkfja;lksdjf;alksdjf;laksjdf;lkajsdflkasjdflkjahsdf' })).toEqual({
    handle: 'Profile handle needs to between 2 and 40 characters',
    skills: 'Skills field is required',
    status: 'Status field is required',
    isValid: false
  });
});

test('Empty status', () => {
  expect(
    profileValidator({
      handle: 'handle'
    })
  ).toEqual({
    status: 'Status field is required',
    skills: 'Skills field is required',
    isValid: false
  });
});

test('Empty skill', () => {
  expect(
    profileValidator({
      handle: 'handle',
      status: 'good'
    })
  ).toEqual({
    skills: 'Skills field is required',
    isValid: false
  });
});

test('Invalid website', () => {
  expect(
    profileValidator({
      handle: 'handle',
      status: 'good',
      skills: 'asdf',
      website: 'lakjflasdkjhf'
    })
  ).toEqual({
    website: 'Website is invalid URL',
    isValid: false
  });
});

test('Ok', () => {
  expect(
    profileValidator({
      handle: 'handle',
      status: 'good',
      skills: 'asdf'
    })
  ).toEqual({
    isValid: true
  });

  expect(
    profileValidator({
      handle: 'handle',
      status: 'good',
      skills: 'asdf',
      website: 'http://nhaxasilkvillage.com/'
    })
  ).toEqual({
    isValid: true
  });
});
