import express from 'express';
import passport from 'passport';

import Profile from '../../models/Profiles';
import User from '../../models/Users';
import {wrapper} from '../../share/utility';
import validateProfile from '../../validation/profile';
import validateExperience from '../../validation/experience';
import validateEducation from '../../validation/education';

const router = express.Router();

/*
 * @route   GET api/profile/test
 * @desc    Test profile route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({msg: 'Profile works'}));

/*
 * @route   GET api/profile/all
 * @desc    Get all profile
 * @access  Public
 */
router.get('/all', async (req, res) => {
  const [findErr, foundProfiles = []] = await wrapper(Profile.find().populate('user', ['name', 'avatar']));

  if (findErr) {
    return res.status(500).json({errors: {message: 'Error occurs when searching profiles', error: findErr}});
  }

  return res.json(foundProfiles);
});

/*
 * @route   GET api/profile/handle/:handle
 * @desc    Get profile by handle
 * @access  Public
 */
router.get('/handle/:handle', async (req, res) => {
  const [findErr, foundProfile] = await wrapper(Profile.findOne({handle: req.params.handle}).populate('user', ['name', 'avatar']));

  if (findErr) {
    return res.status(500).json({errors: {message: 'Error occurs when searching profile', error: findErr}});
  }

  if (!foundProfile) {
    return res.status(404).json({errors: {message: 'There is no profile for this user'}});
  }

  return res.json(foundProfile);
});

/*
 * @route   GET api/profile/user/:userId
 * @desc    Get profile by user id
 * @access  Public
 */
router.get('/user/:userId', async (req, res) => {
  const [findErr, foundProfile] = await wrapper(Profile.findOne({user: req.params.userId}).populate('user', ['name', 'avatar']));

  if (findErr) {
    return res.status(500).json({errors: {message: 'Error occurs when searching profile', error: findErr}});
  }

  if (!foundProfile) {
    return res.status(404).json({errors: {message: 'There is no profile for this user'}});
  }

  return res.json(foundProfile);
});

/*
 * @route   GET api/profile
 * @desc    Get current users profile
 * @access  Private
 */
router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const [findErr, foundProfile] = await wrapper(Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']));
  if (findErr) {
    return res.status(500).json(findErr);
  }

  if (!foundProfile) {
    return res.status(404).json({errors: {message: 'There is no profile for this user'}});
  }

  return res.json(foundProfile);
});

const getProfileFromRequest = req => {
  return {
    user: req.user.id,
    handle: req.body.handle,
    company: req.body.company,
    website: req.body.website,
    location: req.body.location,
    bio: req.body.bio,
    status: req.body.status,
    githubUsername: req.body.githubUsername,
    skills: !!req.body.skills && req.body.skills.split(','),
    social: {
      youtube: req.body.youtube,
      twitter: req.body.twitter,
      facebook: req.body.facebook,
      linkedin: req.body.linkedin,
      instagram: req.body.instagram
    }
  };
};

/*
 * @route   POST api/profile
 * @desc    Create user's profile
 * @access  Private
 */
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const errors = validateProfile(req.body);
  if (!errors.isValid) {
    return res.status(400).json({errors});
  }

  const profileFields = getProfileFromRequest(req);
  const [findHandleErr, foundHandle] = await wrapper(Profile.findOne({handle: profileFields.handle}));
  if (findHandleErr || foundHandle) {
    return res.status(400).json({errors: {message: 'That handle already exists'}});
  }

  const [saveErr, newProfile] = await wrapper(new Profile(profileFields).save());
  if (saveErr || !newProfile) {
    return res.status(500).json({errors: {message: 'Error occur when creating new profile', error: saveErr}});
  }

  return res.json(newProfile);
});

/*
 * @route   PUT api/profile
 * @desc    Create user's profile
 * @access  Private
 */
router.put('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const errors = validateProfile(req.body);
  if (!errors.isValid) {
    return res.status(400).json({errors});
  }

  const [findErr, foundProfile] = await wrapper(Profile.findOne({user: req.user.id}));
  if (findErr || !foundProfile) {
    return res.status(404).json({errors: {message: 'There is no profile for this user'}});
  }

  const profileFields = getProfileFromRequest(req);
  const [updateErr, updatedProfile] = await wrapper(Profile.findOneAndUpdate({_id: foundProfile._id}, {$set: profileFields}, {new: true}));
  if (updateErr || !updatedProfile) {
    return res.status(500).json({errors: {message: `Can't edit user profile`, error: updateErr}});
  }

  return res.json(updatedProfile);
});

/*
 * @route   POST api/profile/experience
 * @desc    Add experience to profile
 * @access  Private
 */
router.post('/experience', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const errors = validateExperience(req.body);
  if (!errors.isValid) {
    return res.status(400).json({errors});
  }

  const [findErr, foundProfile] = await wrapper(Profile.findOne({user: req.user.id}));

  if (findErr || !foundProfile) {
    return res.status(404).json({errors: {message: `There is no profile for this user`}});
  }

  const newExp = {
    title: req.body.title,
    company: req.body.company,
    location: req.body.location,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    description: req.body.description
  };

  foundProfile.experiences = [newExp, ...foundProfile.experiences];

  const [saveErr, profile] = await wrapper(foundProfile.save());
  if (saveErr || !profile) {
    return res.status(500).json({errors: {message: `Error occur when save experiene to profile`, error: saveErr}});
  }

  return res.json(profile);
});

/*
 * @route   POST api/profile/education
 * @desc    Add experience to profile
 * @access  Private
 */
router.post('/education', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const errors = validateEducation(req.body);
  if (!errors.isValid) {
    return res.status(400).json({errors});
  }

  const [findErr, foundProfile] = await wrapper(Profile.findOne({user: req.user.id}));

  if (findErr || !foundProfile) {
    return res.status(404).json({errors: {message: `There is no profile for this user`, error: findErr}});
  }

  const newEducation = {
    school: req.body.school,
    degree: req.body.degree,
    fieldOfStudy: req.body.fieldOfStudy,
    from: req.body.from,
    to: req.body.to,
    current: req.body.current,
    description: req.body.description
  };

  foundProfile.educations = [newEducation, ...foundProfile.educations];

  const [saveErr, profile] = await wrapper(foundProfile.save());
  if (saveErr || !profile) {
    return res.status(500).json({errors: {message: `Error occur when save experience to profile`, error: saveErr}});
  }

  return res.json(profile);
});

/*
 * @route   DELETE api/profile/experience/:expId
 * @desc    Delete experience from profile
 * @access  Private
 */
router.delete('/experience/:expId', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const [findErr, foundProfile] = await wrapper(Profile.findOne({user: req.user.id}));
  if (findErr || !foundProfile) {
    return res.status(404).json({errors: {message: 'There is no profile for current user', error: findErr}});
  }

  foundProfile.experiences = foundProfile.experiences.filter(experience => experience.id !== req.params.expId);

  const [saveErr, savedProfile] = await wrapper(foundProfile.save());
  if (saveErr || !savedProfile) {
    return res.status(500).json({errors: {message: 'Error occur when delete experience from profile', error: saveErr}});
  }

  return res.json(savedProfile);
});

/*
 * @route   DELETE api/profile/education/:eduId
 * @desc    Delete education from profile
 * @access  Private
 */
router.delete('/education/:eduId', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const [findErr, foundProfile] = await wrapper(Profile.findOne({user: req.user.id}));
  if (findErr || !foundProfile) {
    return res.status(404).json({errors: {message: 'There is no profile for current user', error: findErr}});
  }

  foundProfile.educations = foundProfile.educations.filter(edu => edu.id !== req.params.eduId);

  const [saveErr, savedProfile] = await wrapper(foundProfile.save());
  if (saveErr || !savedProfile) {
    return res.status(500).json({errors: {message: 'Error occur when delete education from profile', error: saveErr}});
  }

  return res.json(savedProfile);
});

/*
 * @route   DELETE api/profile
 * @desc    Delete user and profile
 * @access  Private
 */
router.delete('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const [deleteProfileErr] = await wrapper(Profile.findOneAndDelete({user: req.user.id}));
  if (deleteProfileErr) {
    return res.status(404).json({errors: {message: 'Error occur when delete profile', error: deleteProfileErr}});
  }

  const [deleteUserErr] = await wrapper(User.findOneAndDelete({_id: req.user.id}));
  if (deleteUserErr) {
    return res.status(500).json({errors: {message: 'Error occur when delete user', error: deleteUserErr}});
  }

  return res.json({success: true});
});

export default router;
