// Retrieve


module.exports = function(pb) {
    
    //pb depdencies
    var util = pb.util;
    
    function getTables() {};
    util.inherits(getTables, pb.BaseController);

    getTables.prototype.render = function(cb){
        var hostAndPort = pb.config.db.servers[0];
        var arr = hostAndPort.split(":");
        var hosts = arr[1].split("//");
        var host = hosts[1];
        var port = arr[2].split("/")[0];
    	
  	    var Db = require('mongodb').Db,
        MongoClient = require('mongodb').MongoClient,
        Server = require('mongodb').Server,
        ReplSetServers = require('mongodb').ReplSetServers,
        ObjectID = require('mongodb').ObjectID,
        Binary = require('mongodb').Binary,
        GridStore = require('mongodb').GridStore,
        Grid = require('mongodb').Grid,
        Code = require('mongodb').Code,
        //BSON = require('mongodb').pure().BSON,
        assert = require('assert');

        var db = new Db('test', new Server(host, port));
        // Establish connection to db
        db.open(function(err, db) {

          // Use the admin database for the operation
          var adminDb = db.admin();

          // List all the available databases
          adminDb.listDatabases(function(err, dbs) {
            assert.equal(null, err);
            assert.ok(dbs.databases.length > 0);
            cb({content: pb.BaseController.apiResponse(dbs)});
            db.close();
          });
        // db.close();
      });
      // db.close();
  		
	};
    

    getTables.getRoutes = function(cb) {
      var routes = [
        {
          method: 'post',
          path: '/api/mongoDB/get_mongoDB_tables',
          auth_required: false,
          content_type: 'application/json'
        }
      ];
      cb(null, routes);
    };

    //exports
    return getTables;
};