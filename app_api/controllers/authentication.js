const User = require('../models/user');

const register = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email: req.body.email }).exec();
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email
    });
    user.setPassword(req.body.password);
    await user.save();

    const token = user.generateJWT();
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

const login = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user || !user.validPassword(req.body.password)) {
      return res.status(401).json({ message: 'Invalid login credentials' });
    }

    const token = user.generateJWT();
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Error logging in', error: err.message });
  }
};

module.exports = {
  register,
  login
};
