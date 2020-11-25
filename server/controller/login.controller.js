var db = require('../db')
module.exports.login = function(req, res){
    var username = req.body.name;
    var password = req.body.pass;
    console.log(username);
    console.log(password);
    // Select from database, user_account
    console.log('SELECT * FROM USER_ACCOUNT WHERE USER_NAME LIKE N' + '\'' + username + '\'');
    // querry user_account
    db.executeQuery('SELECT * FROM USER_ACCOUNT WHERE USER_NAME LIKE' + '\'' + username + '\'', function(data, err){
        if (err){
            console.log('error');
            res.send(err);
            return;
        }
        if (!data.length){
            res.render('../views/login', {
                errors: ['User does not exist']
            });
            return;
        }
        // Check correct passwork
        if (data[0].PASSWORD !== password){
            res.render('../views/login', {
                errors: ['Incorrect password']
            });
            return;
        }
        res.redirect('/feedbacks/');
    });

}









