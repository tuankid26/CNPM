var express = require('express');
var router = express.Router();
var db = require('../db');
var mailController = require('../controller/mail.controller');

router.get('/', function(req, res){
    res.render('../views/mail');
});
router.post('/email', mailController.sendMail);



module.exports = router;
