const express = require("express");

const { getAllUsers, getUserById } = require("../controllers/users.controller");

const routes = express.Router();

routes.route("/").get(getAllUsers);
routes.route("/:id").get(getUserById);

module.exports = routes;
