const { json, query } = require('express');
var db = require('../db');
"use strict";
module.exports.getAllFeedbacks = function(req, res){
    console.log('SELECT id, title, noiDung, FORMAT(time, \'dd-MM-yyyy\') AS time, quy, status  FROM FEEDBACK\
    WHERE id IN(SELECT id_feedback FROM MAPPING) ORDER BY FEEDBACK.time DESC');
    db.executeQuery('SELECT id, title, noiDung, FORMAT(time, \'dd-MM-yyyy\') AS time, quy, status  FROM FEEDBACK\
                    WHERE id IN(SELECT id_feedback FROM MAPPING) ORDER BY FEEDBACK.time DESC', function(data, err){
        if (err){
            console.log('err here');
            console.log(err);
        }
        else {
            var feedbacks = data;
            var id_feedback = data.id;
            console.log(data);
            res.send(data);
        }
    });
};

module.exports.addFeedback = function(req, res){
    // var id = req.body.id;
    var title = req.body.title;
    var content = req.body.noiDung;
    var time = req.body.time;
    var quy = req.body.quy;
    var status = req.body.status;
    var nguoiPhanAnh = req.body.nguoiPhanAnh;
    console.log('Title: ' + title + ', Content: ' + content + ', Time: ' + time + ', Quy: ' + quy + ', Trang thai: ' + status + ', Nguoi phan anh: ' + nguoiPhanAnh);
    // if (id !== )
    console.log('INSERT INTO FEEDBACK VALUES (' + 'N\'' + title + '\'' + ', ' + 'N\''+ content +'\'' + ', ' + '\'' + time + '\'' + ', ' + quy + ', ' + status + ')');
    db.executeQuery('INSERT INTO FEEDBACK VALUES (' + 'N\'' + title + '\'' + ', ' + 'N\''+ content +'\'' + ', ' + '\'' + time + '\'' + ', ' + quy + ', ' + status + ')', function(err, data){
        if (err){
            res.send(err);
        }
        else {
            console.log('SELECT id FROM NHANKHAU WHERE hoten = N' + '\'' + nguoiPhanAnh + '\'');
            db.executeQuery('SELECT id FROM NHANKHAU WHERE hoten = N' + '\'' + nguoiPhanAnh + '\'', function(data, err){
                if (data && data.length > 0){
                    var id_nhankhau = data[0].id;
                    // db.executeQuery('INSERT INTO MAPPING VALUES (' + )
                    console.log('ok');
                    console.log('SELECT id FROM FEEDBACK WHERE title = N' + '\'' + title + '\'' + ' AND noiDung = N' + '\'' + content + '\'');
                    db.executeQuery('SELECT id FROM FEEDBACK WHERE title = N' + '\'' + title + '\'' + 'AND noiDung = N' + '\'' + content + '\'', function(data, err){
                        if (data && data.length > 0){
                            var id_feedback = data[0].id;
                            // console.log('INSERT INTO MAPPING VALUES (' + id_feedback + ', ' + id_nhankhau + ')');
                            db.executeQuery('INSERT INTO MAPPING VALUES (' + id_feedback + ', ' + id_nhankhau + ')', function(err){
                                if (err){
                                    console.log(err);
                                    return;
                                }
                                else{
                                    res.send({id: id_feedback});
                                }
                            });
                        }
                        else{
                            console.log('err');
                            console.log(err);
                        }
                    })
                    //res.send(data);
                }
                else{
                    console.log('error');
                    //res.send(err);
                }
            });
            
        }
    });

    // db.executeQuery('SELECT id FROM NHANKHAU WHERE hoten = N' + '\'' + nguoiPhanAnh + '\'', function(data, err){
    //     if (data){
    //         // var id = data[0].id;
    //         // db.executeQuery('INSERT INTO MAPPING VALUES (' + )
    //         res.send(data);
    //     }
    //     else{
    //         console.log('error');
    //         res.send(err);
    //     }
    // });



};

module.exports.findNhanKhau = function(req, res){
    // console.log(req.query);
    // console.log('SELECT * FROM FEEDBACK WHERE noiDung LIKE N\'' + req.query.q + '\'');
    console.log(req.query.id)
    console.log('SELECT * FROM NHANKHAU WHERE NHANKHAU.id IN (SELECT id_nhankhau FROM MAPPING WHERE id_feedback = ' + req.query.id + ')');
    db.executeQuery('SELECT * FROM NHANKHAU WHERE NHANKHAU.id IN (SELECT id_nhankhau FROM MAPPING WHERE id_feedback = ' + req.query.id + ')', function(data, err){
        if (err) {
            res.send('Error');
        }
        else{
            res.send(data);
            
        }
    });
};

module.exports.updateFeedback = function(req, res){
    var id = req.body.id;
    var title = req.body.title;
    var noiDung = req.body.noiDung;
    var time = req.body.time;
    var quy = req.body.quy;
    var status = req.body.status;
    var nguoiPhanAnh = req.body.nguoiPhanAnh;
    db.executeQuery('SELECT id FROM NHANKHAU WHERE hoten = N' + '\'' + nguoiPhanAnh + '\'', function(data, err){
        if (data && data.length > 0){
            var id_nhankhau = data[0].id;
            console.log('id_nhankhau' + id_nhankhau);
            console.log('UPDATE FEEDBACK \
            SET title = N' + '\'' + title + '\''  + ', noiDung = N' + '\'' + noiDung + '\'' + ', time = ' + '\'' + time + '\'' + ', quy =' + quy + ', status = ' + status
            + ' WHERE id = ' + id);
            console.log('UPDATE MAPPING SET id_feedback = ' + id + ', id_nhankhau = ' + id_nhankhau);
            // db.executeQuery('UPDATE FEEDBACK \
            //         SET title = N' + '\'' + title + '\''  + ', noiDung = N' + '\'' + noiDung + '\'' + ', time = ' + '\'' + time + '\'' + ', quy =' + quy + ', status = ' + status
            //         + ' WHERE id = ' + id, function(err){
            //             if(err){
            //                 res.send(err);
            //             }           
            // });
            db.executeQuery('UPDATE MAPPING SET id_feedback = ' + id + ', id_nhankhau = ' + id_nhankhau + ' WHERE id_feedback = ' + id, function(err){
                if (err){
                    res.send(err);
                }
            });
            db.executeQuery('UPDATE FEEDBACK \
            SET title = N' + '\'' + title + '\''  + ', noiDung = N' + '\'' + noiDung + '\'' + ', time = ' + '\'' + time + '\'' + ', quy =' + quy + ', status = ' + status
            + ' WHERE id = ' + id, function(err){
                if(err){
                    res.send(err);
                }           
    });
        }
        else{
            console.log(err);
        }
    })
    
};

module.exports.updateStatus = function(req, res){
    // console.log(req.body);
    var id = req.body.id;
    var status =req.body.status;
    console.log(id);
    // console.log('DELETE FROM MAPPING WHERE id_feedback = ' + id);
    // console.log('DELETE FROM FEEDBACK WHERE id = ' + id);
    console.log('UPDATE FEEDBACK SET ' + ' status = ' + status
        + ' WHERE id = ' + id)
    db.executeQuery('UPDATE FEEDBACK SET ' + ' status = ' + status
    + ' WHERE id = ' + id, function(err){
        if(err){
            res.send(err);
        }           
});

};

module.exports.deleteFeedback = function(req, res){
    // console.log(req.body);
    var id = req.body.id;
    console.log(id);
    // console.log('DELETE FROM MAPPING WHERE id_feedback = ' + id);
    // console.log('DELETE FROM FEEDBACK WHERE id = ' + id);
    var query = 'DELETE FROM MAPPING WHERE id_feedback = ' + id + ';'
    query += 'DELETE FROM FEEDBACK WHERE id = ' + id + ';'
    db.executeQuery(query, function(err, data){
        if (err){
            res.send(err);
        }
        else { 
            res.send(data);
        }
    });

};

module.exports.mergeFeedBacks = function(req, res){
    // console.log('merging');
    var ids = req.body.id;
    console.log(ids);
    var firstID = ids[0];
    var query = 'UPDATE MAPPING SET id_feedback = ' + firstID + ' WHERE id_feedback IN (';
    for (i = 0; i < ids.length; i++){
        if (i != ids.length - 1){
            query += ids[i] + ', ';
        }
        else {
            query += ids[i] + ')';
        }
    }

    console.log(query);
    db.executeQuery(query, function(err){
        console.log(err);
        res.send(err);
    })
    
}