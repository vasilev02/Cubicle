const User = require("../models/User");
const bcrypt = require("bcrypt");
// const { SALT_ROUNDS } = require("../config/config");

async function register(username, password) {
  try {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    
    const user = new User({ username, password: hash });
    return await user.save();
  } catch (error) {
  }
}

module.exports = {
  register,
};
