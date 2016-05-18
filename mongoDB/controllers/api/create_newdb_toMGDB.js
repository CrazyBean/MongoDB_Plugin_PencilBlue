// Retrieve


module.exports = function(pb) {
    
    //pb depdencies
    var util = pb.util;
    
    function createNewdb2MGDB() {};
    util.inherits(createNewdb2MGDB, pb.BaseController);

    var hostAndPort = pb.config.db.servers[0];

    createNewdb2MGDB.prototype.render = function(cb){
    	 var self = this;
       this.getJSONPostParams(function(err, post) {
        var new_dbname = post.new_dbname;
        
        var MongoClient = require('mongodb').MongoClient;
        var assert = require('assert');
        MongoClient.connect(hostAndPort + new_dbname, function(err, db) {
           if(err) { return console.dir(err); }
           db.createCollection("test_for_new_database", function(err, result) {
            if(err) { return console.dir(err); }
            cb({content: pb.BaseController.apiResponse(pb.BaseController.API_SUCCESS, 'Create new database',new_dbname)});
            db.close();
            //   db.collections(function(err, collections) {
            //   assert.equal(null, err);
            //   assert.ok(collections.length > 0);
              
              
            // });
              
           });//end createCollection
           // db.close();
        });
      });
	 };
    

    createNewdb2MGDB.getRoutes = function(cb) {
      var routes = [
        {
          method: 'post',
          path: '/api/mongoDB/create_newdb_toMGDB',
          auth_required: false,
          content_type: 'application/json'
        }
      ];
      cb(null, routes);
    };

    //exports
    return createNewdb2MGDB;
};