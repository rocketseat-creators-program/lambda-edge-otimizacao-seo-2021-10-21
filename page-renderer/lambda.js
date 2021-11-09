const app = require("./app.js");
const serverless = require("aws-serverless-koa");

module.exports.handler = serverless(app);