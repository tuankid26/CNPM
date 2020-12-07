const { json } = require('express');
var db = require('../db');

module.exports.getAllFeedbacks = function(req, res){
    db.executeQuery('SELECT * FROM FEEDBACK WHERE ID IN (SELECT ID_FEEDBACK IN Mapping)', function(data, err){
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
    var noidung = req.body.noidung;
    var time = req.body.time;
    var status = req.body.status;
    var hoten =  req.body.hoten;
    var diachi = req.body.diachi;
    var ngaysinh = req.body.ngaysinh;
    var gioitinh =  req.body.gioitinh;
    db.executeQuery('SELECT hoten FROM NHANKHAU WHERE hoten =  ' + hoten, function(err, data){
        if (data.length == 0){
            db.executeQuery('INSERT INTO NHANKHAU VALUES (' + hoten + ', ' + ngaysinh + ', ' + diachi + ', ' + gioitinh + ')');
        }
    }
    )

    db.executeQuery('INSERT INTO FEEDBACK VALUES (' + noidung + ', ' + time + ', ' + status + ')', function(err,data){
        res.writeHead(500);
        res.send(JSON.stringify(err));
    });

    db.executeQuery('INSERT INTO MAPPING VALUES ( SELECT ID_FEEDBACK FROM FEEDBACK WHERE FEEDBACK.noiDung = ' + noidung +', SELECT ID_NHANKHAU FROM NHANKHAU WHERE NHANKHAU.Hoten = ' + hoten + ', ' + time + ')', function(err,data){
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


module.exports.mergeFeedback = function(req, res){
    var list_idMerge = req.params.list_idMerge;
    
    // for (i = 0; i < list_idMerge.length; i++){
    //     db.executeQuery('SELECT ID_NHANHKHAU, ID_FEEDBACK FROM Mapping WHERE')
        
    // }
    db.executeQuery('UPDATE Mapping SET ID_FEEDBACK =' + list_idMerge[0] + 'WHERE ID_FEEDBACK IN' + list_idMerge + ')';

}