const { hash, compare } = require('bcrypt');
const User = require('../models/User');
const { loginValidator, registerValidator } = require('../validators/auth');
const findErrors = require('../middlewares/findErrors');
const { registerData, loginData } = require('../utils/extractDataFromBody');

module.exports.register = [
  ...registerValidator,
  findErrors,
  async (req, res) => {

    try {
      // extract the data from the body
      const userData = registerData(req.body);
      // check if this mail exist
      const existUser = await User.findOne({email: userData.email});
      if (existUser) {
        return res.status(400).json({
          error: 'This mail is already exist'
        })
      }
      // hash the password
      userData.password = await hash(userData.password, 10);
      // create the user
      const user = await User.create(userData);

      res.json({
        message: `${user.fullName} registered successfully`
      });
    } catch(err) {
      console.log('[Register]: ' + err);
      res.status(500).json({
        error: 'try later'
      });
    }
  }
];

module.exports.login = [
  ...loginValidator,
  findErrors,
  async (req, res) => {
    try {
      // extract the data from the body
      const userData = loginData(req.body);
      const user = await User.findOne({ email: userData.email});

      // check if this user exist or not
      if(!user) {
        return res.status(404)
        .json({
          error: `The user with this email: ${userData.email} does not exist`
        });
      }
      
      // compare the received password with the stored one
      const isMatched = await compare(userData.password, user.password);

      if (isMatched) {
        req.session.auth = true;
        req.session.userId = user._id;

        return res.json({
          message: 'logged in successfully'
        });
      }

      res.status(400).
      json({
        error: 'the password is wrong'
      });
      
    } catch(err) {
      console.log('[Login]: ' + err);
      res.status(500).json({
        error: 'try later'
      });
    }
  }
];

module.exports.logout = [
  (req, res) => {
    req.session.destroy();
    res.json({
      message: 'done'
    });
  }
]

module.exports.isConnected = [
  async (req, res) => {
    try {
      if (req.session.auth) {
        const userId = req.session.userId;
        const user = await User.findById(userId);
        return res.json({
          isConnected: true,
          email: user.email
        });

      }
      
      res.json({
        isConnected: false
      });
    } catch (err) {
      console.log('[TodoList]: ' + err);
      res.status(500).json({
        error: 'try later'
      });
    }
  }
]