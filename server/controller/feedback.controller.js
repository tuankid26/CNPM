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
    console.log("ok");
    var id = req.body.id;
    var tieude=req.body.tieude;
    var noiDung=req.body.noiDung;
    var quy=req.body.quy;
    var time = req.body.time;
    var status = req.body.status;
    var nguoiPhanAnh=req.body.nguoiPhanAnh;
    console.log('INSERT INTO FEEDBACK VALUES (' +'\''+ tieude+'\''+', '+'\''+ noiDung+'\'' +', '+quy+', ' + '\'' + time + '\', ' +'\''+ status+'\'' + ', '+ nguoiPhanAnh + ')')
    db.executeQuery('INSERT INTO FEEDBACK VALUES (' +'\''+ tieude+'\''+', '+'\''+ noiDung+'\'' +', '+quy+', ' + '\'' + time + '\', ' +'\''+ status+'\'' + ', '+ nguoiPhanAnh++ + ')', function(err){
        res.send(err);
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
    var tieude = req.body.tieude;
    var noiDung = req.body.noiDung;
    var status = req.body.status;
    var time = req.body.time;
    db.executeQuery('UPDATE FEEDBACK \
                    SET noiDung = ' + noiDung + ', time = ' + time + ', status = ' + status
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