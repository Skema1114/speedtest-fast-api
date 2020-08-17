const express = require('express');
const routes = express.Router();
const speedTestController = require('./speedTestController');

routes.get('/', speedTestController.get);

module.exports = routes;