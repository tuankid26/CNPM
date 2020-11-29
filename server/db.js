var sql = require('mssql');
const tls = require('tls');
var settings = require('./setting');
tls.DEFAULT_MIN_VERSION = 'TLSv1';

// const config = {
//     user: 'localhost',
//     password: 'qweasdzxc',
//     server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
//     database: 'DB',
//     port: 1413
// }



module.exports.executeQuery = function(query, callback){
    var conn = new sql.ConnectionPool(settings.dbConfig);
    conn.connect().then(function(){
        var req = new sql.Request(conn);
        
        req.query(query).then(function(recordset){
            callback(recordset.recordset);
            //callback(recordset);
        }).catch(function(err){
            console.log(err);
            callback(null, err);
        });
    }).catch(function(err){
        console.log(err);
        callback(null, err);
    });
    
    // console.log(result);
}
// conn.connect(function (err){
//     if (err){
//         console.log(error);
//         return;
//     }
// });


// conn.connect().then(function () {
//     var req = new sql.Request(conn);
//     req.query('SELECT * FROM PRODUCT').then(function(recordset){
//         console.log(recordset.recordset);
//         conn.close();
//     }).catch(function(err){
//         console.log(err);
//     });
// }).catch(function (err){
//     console.log(err);
// });


