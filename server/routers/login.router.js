var express = require('express');
var Router = express.router();
var db = require('../db');
var loginController = require('../controller/login.controller');
Router.get('/', function(req, res){
    res.render('../views/login');
})
Router.post('/', loginController.login);
module.exports = Router;