const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  hashPassword: async (plainPassword) => {
    salt = bcrypt.genSaltSync(10);
    hash = bcrypt.hashSync(plainPassword, salt);
    return hash;
  },
};
