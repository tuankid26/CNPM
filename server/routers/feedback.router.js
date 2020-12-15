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
router.get('/search', feedbackController.findFeedback);
<<<<<<< HEAD
router.route('/:id')
    .post(feedbackController.updateFeedback)
    .delete(feedbackController.deleteFeedback);
=======
// router.route('/:id')
//     .put(feedbackController.updateFeedback)
//     .delete(feedbackController.deleteFeedback);

router.post('/update', feedbackController.updateFeedback);
router.post('/delete', feedbackController.deleteFeedback);
router.post('/merge', feedbackController.mergeFeedBacks);
>>>>>>> 17a8df7ce7f9e4e1e6fc87f63860d164e71d24c7


module.exports = router;

