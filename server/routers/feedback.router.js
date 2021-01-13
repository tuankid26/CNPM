var express = require('express');
var router = express.Router();
var db = require('../db');
var feedbackController = require('../controller/feedback.controller');


router.route('/')
    .get(feedbackController.getAllFeedbacks)
    // .get(function(req, res){
    //     res.render('../views/feedback');
    // })
    .post(feedbackController.addFeedback);
router.get('/search', feedbackController.findNhanKhau);

router.post('/updateStatus',feedbackController.updateStatus);
router.post('/update', feedbackController.updateFeedback);
router.post('/delete', feedbackController.deleteFeedback);
router.post('/merge', feedbackController.mergeFeedBacks);


module.exports = router;

