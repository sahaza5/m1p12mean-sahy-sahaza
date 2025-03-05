const express = require("express");
const { loginAdmin } = require("../controllers/admin.controller");

const routes = express.Router();

routes.route("/login").post(loginAdmin);

module.exports = routes;
