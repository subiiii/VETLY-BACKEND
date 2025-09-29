const express = require('express');
const { seedAdmin, adminLogin } = require('../controller/admin.controller');
const { isAuthenticated, isAdmin } = require('../utils/auth');

const route = express.Router();

route.post('/signup', seedAdmin);
route.post('/login', adminLogin);

module.exports = route;