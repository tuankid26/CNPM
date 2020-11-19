var db = require('../db')
module.exports.login = function(req, res){
    var username = req.body.name;
    var password = req.body.pass;
    console.log(username);
    console.log(password);
    console.log('SELECT * FROM USER_ACCOUNT WHERE USER_NAME LIKE N' + '\'' + username + '\'');
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
        
        if (data[0].PASSWORD !== password){
            res.render('../views/login', {
                errors: ['Incorrect password']
            });
            return;
        }
        res.redirect('/feedbacks/');
    });

}