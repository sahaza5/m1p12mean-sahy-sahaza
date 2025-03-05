const express = require("express");

const { getAllUsers } = require("../controllers/users.controller");

const routes = express.Router();

routes.route("/").get(getAllUsers);

module.exports = routes;
