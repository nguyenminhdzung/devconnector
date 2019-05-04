import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },

  text: {
    type: String,
    required: true
  },

  name: {
    type: String
  },

  avatar: {
    type: String
  },

  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],

  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },

      name: {
        type: String
      },

      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],

  date: {
    type: Date,
    default: Date.now
  }
});

export const POSTS_MODEL = 'posts';

const Post = mongoose.model(POSTS_MODEL, PostSchema);
export default Post;
