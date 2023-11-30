const factory = require('./handlerFactory');
const User = require('../models/usersModel');

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);

// exports.getMe =
