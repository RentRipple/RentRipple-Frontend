// eslint-disable-next-line no-undef
const Dotenv = require('dotenv-webpack');
// eslint-disable-next-line no-undef
module.exports = {
  // Your webpack configuration
  plugins: [
    new Dotenv({
      path: './.env', // Path to your .env file (this is the default)
      safe: false, // Load '.env.example' to verify the .env variables are all set. Can also be a string to a different file.
    }),
  ],
};
