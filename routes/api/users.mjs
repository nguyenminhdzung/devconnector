import express from 'express';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import User from '../../models/Users';
import { convertPromise, wrapper } from '../../share/utility';
import { secretOrKey } from '../../config/keys';
import registerValidator from '../../validation/register';
import loginValidator from '../../validation/login';

const genSalt = convertPromise(bcrypt.genSalt);
const hash = convertPromise(bcrypt.hash);
const compare = convertPromise(bcrypt.compare);
const jwtSign = convertPromise(jwt.sign);

const router = express.Router();

/*
 * @route   GET api/users/test
 * @desc    Test users route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({ msg: 'Users works' }));

/*
 * @route   POST api/users/register
 * @desc    Register
 * @access  Public
 */
router.post('/register', async (req, res) => {
  const errors = registerValidator(req.body);
  if (!errors.isValid) {
    return res.status(400).json({ errors });
  }
  const [findErr, foundUser] = await wrapper(User.findOne({ email: req.body.email }));

  if (findErr) {
    return res.status(500).json({ errors: { message: 'Get error when searching user', error: findErr } });
  }

  if (foundUser) {
    return res.status(400).json({ errors: { message: 'Email already exists' } });
  }

  const avatar = gravatar.url(req.body.email, {
    s: '200', // Size
    r: 'g', // Rating
    d: 'mm' // Default
  });

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    avatar,
    password: req.body.password
  });

  const [saltErr, salt] = await genSalt(10);
  if (saltErr || !salt) {
    console.log(saltErr);
    return res.status(500).json({ errors: { message: `Can't create new user` } });
  }
  const [hashErr, hashedPassword] = await hash(newUser.password, salt);

  if (hashErr || !hash) {
    console.log(hashErr);
    return res.status(500).json({ errors: { message: `Can't create new user` } });
  }

  newUser.password = hashedPassword;
  const [saveErr, user] = await wrapper(newUser.save());
  if (saveErr || !user) {
    console.log(saveErr);
    return res.status(500).json({ errors: { message: `Can't save new user`, error: saveErr } });
  }

  return res.status(200).json(user);
});

/*
 * @route   POST api/users/login
 * @desc    Login User | Returning JWT Token
 * @access  Public
 */
router.post('/login', async (req, res) => {
  const errors = loginValidator(req.body);
  if (!errors.isValid) {
    return res.status(400).json({ errors });
  }

  const { email, password } = req.body;
  const [findErr, foundUser] = await wrapper(User.findOne({ email }));
  if (findErr) {
    return res.status(500).json({ errors: { message: 'Get error when searching user', error: findErr } });
  }

  if (!foundUser) {
    return res.status(404).json({ errors: { message: 'User not found' } });
  }

  const [compareErr, isMarch] = await compare(password, foundUser.password);

  if (compareErr || !isMarch) {
    return res.status(400).json({ errors: { message: 'Password incorrect' } });
  }

  const payload = { id: foundUser._id, name: foundUser.name, avatar: foundUser.avatar };

  const [signErr, token] = await jwtSign(payload, secretOrKey, { expiresIn: 3600 });
  if (signErr || !token) {
    return res.status(500).json({ errors: { message: `Can't create token` } });
  }

  return res.json({
    token: `Bearer ${token}`
  });
});

/*
 * @route   GET api/users/current
 * @desc    Return current user
 * @access  Private
 */
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

export default router;
