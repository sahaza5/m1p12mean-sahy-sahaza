const express = require("express");
const { login } = require("../controllers/admin.controller");

const routes = express.Router();

routes.route("/login").post(login);

module.exports = routes;
