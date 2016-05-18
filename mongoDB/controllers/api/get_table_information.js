// Retrieve


module.exports = function(pb) {
    
    //pb depdencies
    var util = pb.util;
    
    function getTableInformation() {};
    util.inherits(getTableInformation, pb.BaseController);

    getTableInformation.prototype.render = function(cb){
        var self = this;

        this.getJSONPostParams(function(err, post) {
            var dbname = post.dbname;
            // cb({content: pb.BaseController.apiResponse(pb.BaseController.API_SUCCESS, 'Send DB Name',dbname)});
            var Db = require('mongodb').Db,
            MongoClient = require('mongodb').MongoClient,
            Server = require('mongodb').Server,
            ReplSetServers = require('mongodb').ReplSetServers,
            ObjectID = require('mongodb').ObjectID,
            Binary = require('mongodb').Binary,
            GridStore = require('mongodb').GridStore,
            Grid = require('mongodb').Grid,
            Code = require('mongodb').Code,
            // BSON = require('mongodb').pure().BSON,
            assert = require('assert');
            var localhost = "localhost";
            var port = 27017;
            var db = new Db(dbname, new Server(localhost, port));
            var serverPortData = {
                serverUsed : localhost,
                port : port
            };
            // Establish connection to db
            db.open(function(err, db) {
                assert.equal(null, err);
                db.stats(function(err, stats) {//buildInfo,serverStatus
                    assert.ok(err == null);
                    // var dbinfo = stats + postData;
                    var dbinfo = eval('('+(JSON.stringify(serverPortData)+JSON.stringify(stats)).replace(/}{/,',')+')');
                    cb({content: pb.BaseController.apiResponse(pb.BaseController.API_SUCCESS, 'Send DB Information',dbinfo)});
                    db.close();
                  });

            });
            // db.close();

        });//end getJsonPostParams

    };//end render
    

    getTableInformation.getRoutes = function(cb) {
      var routes = [
        {
          method: 'post',
          path: '/api/mongoDB/get_table_information',
          auth_required: false,
          content_type: 'application/json'
        }
      ];
      cb(null, routes);
    };

    //exports
    return getTableInformation;
};