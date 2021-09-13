const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SALT_ROUNDS, SECRET } = require("../config/config");

async function register(username, password) {
  try {
    let salt = await bcrypt.genSalt(SALT_ROUNDS);
    let hash = await bcrypt.hash(password, salt);
    
    const user = new User({ username, password: hash });
    return await user.save();
  } catch (error) {
  }
}

async function login(username, password) {
    const user = await User.findOne({username});

    if(!user){
        throw {message: "No such user !"}
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw {message: "Wrong password !"}
    }

    let token = jwt.sign({_id: user._id}, SECRET);
    return token;
  }

module.exports = {
  register,
  login
};
