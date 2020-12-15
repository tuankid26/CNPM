var sql = require('mssql');
const tls = require('tls');
var settings = require('./setting');
tls.DEFAULT_MIN_VERSION = 'TLSv1';





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

