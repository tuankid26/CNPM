var express = require('express');
var router = express.Router();
var db = require('../db');
var loginController = require('../controller/login.controller');

router.get('/', function(req, res){
    res.render('../views/login');
})
router.post('/', loginController.login);



module.exports = router;
