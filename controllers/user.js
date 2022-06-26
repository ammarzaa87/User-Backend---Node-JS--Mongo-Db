const User = require('../models/user');

exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => {
      res
        .status(200)
        .json({ message: 'Fetched users successfully.', users: users });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createUser = (req, res, next) => {
  const name = req.body.name;
  const age = req.body.age;
  const job = req.body.job;
  const user = new User({
    name: name,
    age: age,
    job: job,
    
  });
  user
    .save()
    .then(result => {
      res.status(201).json({
        message: 'User created successfully!',
        user: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then(user => {
      if (!user) {
        const error = new Error('Could not find User');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'User fetched.', user: user });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const name = req.body.name;
  const age = req.body.age;
  const job = req.body.job;
  
  
  User.findById(userId)
    .then(user => {
      if (!user) {
        const error = new Error('Could not find user.');
        error.statusCode = 404;
        throw error;
      }
      
      user.name = name;
      user.age = age;
      user.job = job;
      return user.save();
    })
    .then(result => {
      res.status(200).json({ message: 'User updated!', user: result });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
