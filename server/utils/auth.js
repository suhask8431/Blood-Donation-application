const bcrypt = require('bcrypt');

const saltRounds = 10;

const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

const comparePassword = async (password, hash) => {
  try {
    const match = await bcrypt.compare(password, hash);
    return match;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

module.exports = {
  encryptPassword,
  comparePassword
};