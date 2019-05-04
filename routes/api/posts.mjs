import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

import Post from '../../models/Posts';
import { wrapper } from '../../share/utility';
import validatePost from '../../validation/post';

const router = express.Router();

/*
 * @route   GET api/posts/test
 * @desc    Test posts route
 * @access  Public
 */
router.get('/test', (req, res) => res.json({ msg: 'Posts works' }));

/*
 * @route   GET api/posts
 * @desc    Get posts route
 * @access  Public
 */
router.get('/', async (req, res) => {
  const [findErr, foundPosts = []] = await wrapper(Post.find().sort({ data: -1 }));
  if (findErr) {
    return res.status(500).json({ errors: { message: 'Error occur when fetching posts' } });
  }

  return res.json(foundPosts);
});

/*
 * @route   GET api/posts/postId
 * @desc    Get posts by id
 * @access  Public
 */
router.get('/:postId', async (req, res) => {
  const [findErr, foundPost] = await wrapper(Post.findById(req.params.postId));
  if (findErr || !foundPost) {
    return res.status(404).json({ errors: { message: 'There is no post with that id' } });
  }

  return res.json(foundPost);
});

/*
 * @route   POST api/posts
 * @desc    Create post
 * @access  Public
 */
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = validatePost(req.body);

  if (!errors.isValid) {
    return res.status(400).json({ errors });
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  const [saveErr, savedPost] = await wrapper(newPost.save());
  if (saveErr || !savedPost) {
    return res.status(500).json({ errors: { message: 'Error occur when create new post' } });
  }

  return res.json(savedPost);
});

/*
 * @route   DELETE api/posts/:postId
 * @desc    Test posts route
 * @access  Public
 */
router.delete('/:postId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const [findErr, foundPost] = await wrapper(Post.findById(req.params.postId));
  if (findErr || !foundPost) {
    return res.status(404).json({ errors: { message: 'There is no post with that id' } });
  }

  if (foundPost.user.toString() !== req.user.id) {
    return res.status(403).json({ errors: { message: `You don't have permission to delete this post` } });
  }

  const [deleteErr] = await wrapper(foundPost.remove());
  if (deleteErr) {
    return res.status(500).json({ errors: { message: 'Error occur when deleting the post' } });
  }

  return res.json({ success: true });
});

/*
 * @route   PUT api/posts/like/:postId
 * @desc    Like posts
 * @access  Public
 */
router.put('/like/:postId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const [findErr, foundPost] = await wrapper(Post.findById(req.params.postId));
  if (findErr || !foundPost) {
    return res.status(404).json({ errors: { message: 'There is no post with that id' } });
  }

  if (foundPost.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
    return res.status(400).json({ errors: { message: 'User already liked this post' } });
  }

  foundPost.likes = [{ user: req.user.id }, ...foundPost.likes];
  const [saveErr, savedPost] = await wrapper(foundPost.save());
  if (saveErr) {
    return res.status(500).json({ errors: { message: 'Error occure when update post' } });
  }

  return res.json(savedPost);
});

/*
 * @route   PUT api/posts/unlike/:postId
 * @desc    Like posts
 * @access  Public
 */
router.put('/unlike/:postId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const [findErr, foundPost] = await wrapper(Post.findById(req.params.postId));
  if (findErr || !foundPost) {
    return res.status(404).json({ errors: { message: 'There is no post with that id' } });
  }

  if (foundPost.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
    return res.status(400).json({ errors: { message: 'You havenot yet liked this post' } });
  }

  foundPost.likes = foundPost.likes.filter(like => like.user.toString() !== req.user.id);
  const [saveErr, savedPost] = await wrapper(foundPost.save());
  if (saveErr) {
    return res.status(500).json({ errors: { message: 'Error occure when update post' } });
  }

  return res.json(savedPost);
});

/*
 * @route   POST api/posts/:postId/comment
 * @desc    Add comment to post
 * @access  Private
 */
router.post('/:postId/comment', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const errors = validatePost(req.body);
  if (!errors.isValid) {
    return res.status(400).json({ errors });
  }

  const [findErr, foundPost] = await wrapper(Post.findById(req.params.postId));
  if (findErr || !foundPost) {
    return res.status(404).json({ errors: { message: 'No post found' } });
  }

  const newComment = {
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  };

  foundPost.comments = [newComment, ...foundPost.comments];
  const [saveErr, savedPost] = await wrapper(foundPost.save());
  if (saveErr) {
    return res.status(500).json({ errors: { message: 'Error occur when create comment' } });
  }

  return res.json(savedPost);
});

/*
 * @route   DELETE api/posts/:postId/comment/commentId
 * @desc    Delete comment from post
 * @access  Private
 */
router.delete('/:postId/comment/:commentId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const [findErr, foundPost] = await wrapper(Post.findById(req.params.postId));
  if (findErr || !foundPost) {
    return res.status(404).json({ errors: { message: 'No post found' } });
  }

  const foundComments = foundPost.comments.filter(comment => comment._id.toString() === req.params.commentId);

  if (foundComments.length <= 0) {
    return res.status(404).json({ errors: { message: `Comment does not exist` } });
  }

  if (foundComments.length > 0 && foundComments[0].user.toString() !== req.user.id) {
    return res.status(403).json({ errors: { message: `You don't have permission to delete this comment` } });
  }

  foundPost.comments = foundPost.comments.filter(comment => comment._id === req.params.commentId);
  const [saveErr, savedPost] = await wrapper(foundPost.save());
  if (saveErr) {
    return res.status(500).json({ errors: { message: 'Error occur when create comment' } });
  }

  return res.json(savedPost);
});

export default router;
