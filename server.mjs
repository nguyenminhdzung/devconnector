import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import path from 'path';

import {users, posts, profile} from './routes/api/index.mjs';

import {dbConnectionString} from './config/keys';
import passportConfig from './config/passport';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose
  .connect(
    dbConnectionString,
    {useNewUrlParser: true}
  )
  .then(() => console.log('Connect success'))
  .catch(err => console.log('Connect fail: ', err));

app.use(passport.initialize());
passportConfig(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  const dirname = path.dirname(new URL(import.meta.url).pathname);
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirname, 'client', 'build', 'index.html'));
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
