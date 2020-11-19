var db = require('../db')
module.exports.login = function(req, res){
    var username = req.name;
    var password = req.password;
    db.executeQuery('SELECT * FROM USER WHERE username LIKE N' + '\'' + username + '\'', function(data, err){
        if (err){
            res.send(err);
            return;
        }
        if (!data){
            res.send('No user found');
            return;
        }
        if (data.password !== password){
            res.send('Incorrect password');
            return;
        }
        res.redirect('/feedback/');
    });

}