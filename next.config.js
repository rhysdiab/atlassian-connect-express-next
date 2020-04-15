require('dotenv').config()
module.exports = {
 env: {
  // Reference a variable that was defined in the .env file and make it available at Build Time
  TEST_VAR: process.env.TEST_VAR,
  SENTRY_URL: process.env.SENTRY_URL,
  TOKEN: process.env.TOKEN,
  HOST_BASE_URL: process.env.HOST_BASE_URL,
  LOCAL_BASE_URL: process.env.LOCAL_BASE_URL,
  USER_ACCOUNT_ID: process.env.USER_ACCOUNT_ID,
  DOCUMENTATION: process.env.DOCUMENTATION,
 },
}