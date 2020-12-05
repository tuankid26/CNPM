const { json } = require('express');
var db = require('../db');

module.exports.getAllFeedbacks = function(req, res){
    db.executeQuery('SELECT * FROM FEEDBACK', function(data, err){
        if (err){
            // res.writeHead(500, 'Internal error', {'Content-type': 'text/html'})
            res.send('error occured');
            console.log(err);
            console.log('err');
        }
        else {
            console.log(data)
            // recordset = []
            // data.foreach(row => recordset.push)
            // res.render('../views/feedback', {
            //     data: data
            // });
            res.send(data);
        }
    });

};

module.exports.addFeedback = function(req, res){
    var name = req.body.name;
    var time = req.body.time;
    var status = req.body.status;
    db.executeQuery('INSERT INTO FEEDBACK VALUES (' + name + ', ' + time + ', ' + status + ')', function(err){
        res.writeHead(500);
        res.send(JSON.stringify(err));
    });

};

module.exports.findFeedback = function(req, res){
    // console.log(req.query);
    // console.log('SELECT * FROM FEEDBACK WHERE noiDung LIKE N\'' + req.query.q + '\'');
    db.executeQuery('SELECT * FROM FEEDBACK WHERE noiDung LIKE N\'' + req.query.q + '\'', function(data, err){
        if (err) {
            res.send('Error');
        }
        else{
            res.send(data);
        }
    });
};

module.exports.updateFeedback = function(req, res){
    var id = req.params.id;
    var name = req.body.name;
    var time = req.body.time;
    var status = req.body.status;
    db.executeQuery('UPDATE FEEDBACK \
                    SET noiDung = ' + name + ', time = ' + time + ', status = ' + status
                    + 'WHERE id = ' + id, function(err){
                        res.send(err);
                    });
};

module.exports.deleteFeedback = function(req, res){
    var id = req.params.id;
    db.executeQuery('DELETE FROM FEEDBACK WHERE id = ' + id, function(err){
        res.send(err);
    });
};