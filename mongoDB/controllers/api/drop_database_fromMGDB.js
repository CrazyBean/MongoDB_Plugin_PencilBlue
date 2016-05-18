// Retrieve


module.exports = function(pb) {
    
    //pb depdencies
    var util = pb.util;
    
    function dropDBfromMGDB() {};
    util.inherits(dropDBfromMGDB, pb.BaseController);

    var hostAndPort = pb.config.db.servers[0];

    dropDBfromMGDB.prototype.render = function(cb){
    	 var self = this;
       this.getJSONPostParams(function(err, post) {
        var drop_pointed_dbname = post.drop_pointed_dbname; 
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect(hostAndPort + drop_pointed_dbname, function(err, db) {
           if(err) { return console.dir(err); }
            db.dropDatabase(function(err, result) {
            
              cb({content: pb.BaseController.apiResponse(pb.BaseController.API_SUCCESS, 'Drop pointed database',result)});
              db.close();
          });
            // db.close();
        });
      });
	 };
    

    dropDBfromMGDB.getRoutes = function(cb) {
      var routes = [
        {
          method: 'post',
          path: '/api/mongoDB/drop_database_fromMGDB',
          auth_required: false,
          content_type: 'application/json'
        }
      ];
      cb(null, routes);
    };

    //exports
    return dropDBfromMGDB;
};