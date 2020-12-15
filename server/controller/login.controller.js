var db = require('../db')
module.exports.login = function(req, res){
    var username = req.body.user;
    var password = req.body.password;
    console.log(username);
    console.log(password);
    // Select from database, user_account
    console.log('SELECT * FROM USER_ACCOUNT WHERE USER_NAME LIKE ' + '\'' + username + '\'');
    // querry user_account
    db.executeQuery('SELECT * FROM USER_ACCOUNT WHERE USER_NAME LIKE' + '\'' + username + '\'', function(data, err){
        if (err){
            console.log('error');
            res.send(err);
            return;
        }
        if (!data.length){
            // res.render('../views/login', {
            //     errors: ['User does not exist']
            // });
            res.send('user');
            return;
        }
        // Check correct passwork
        if (data[0].PASSWORD !== password){
            // res.render('../views/login', {
            //     errors: ['Incorrect password']
            // });
            res.send('pass');
            return;
        }
        res.send('success');
        //res.redirect('/feedbacks/');
    });

}