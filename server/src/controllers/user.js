const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config');
const responseCode = require('../utils/response-code');

const getAllUser = async (req, res, next) => {
  const users = await User.findAll({
    attributes: ['id', 'sns_id', 'profile_image'],
  });
  return res.status(responseCode.RESPONSE_OK).json(users);
};

const getCurrentUser = async (req, res, next) => {
  const authorizationHeaderValue = req.headers.authorization;
  if (!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer ')) {
    const error = new Error('no auth token');
    error.status = responseCode.UNAUTHORIZED;
    next(error);
  }

  const token = authorizationHeaderValue.slice(7, authorizationHeaderValue.length).trimLeft();
  jwt.verify(token, config.jwt.secretKey, async (err, decoded) => {
    if (err) next(err);
    const currentUser = await User.findOne({
      where: { sns_id: decoded.sns_id },
      attributes: ['id', 'sns_id', 'profile_image'],
    });
    res.status(responseCode.RESPONSE_OK).json(currentUser);
  });
};
module.exports = { getAllUser, getCurrentUser };
