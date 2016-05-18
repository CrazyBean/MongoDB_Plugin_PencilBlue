// Retrieve


module.exports = function(pb) {
    
    //pb depdencies
    var util = pb.util;
    
    function deleteCollection() {};
    util.inherits(deleteCollection, pb.BaseController);

    var hostAndPort = pb.config.db.servers[0];

    deleteCollection.prototype.render = function(cb){
    	var self = this;

      this.getJSONPostParams(function(err, post) {

        var dbName = post.dbname;
        var collectionName = post.collectionname;

        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect(hostAndPort+dbName, function(err, db) {
        if(err) { return console.dir(err); }
          db.collection(collectionName).drop(function(err, records){
            if(util.isError(err)) {
              cb({
                code: 400,
                content: pb.BaseController.apiResponse(pb.BaseController.API_ERROR, "Invalid Drop")
              });
              db.close();
              return;
             }
             cb({content: pb.BaseController.apiResponse(pb.BaseController.API_SUCCESS, 'Drop Success')});
             db.close();
          });
          //db.close();
          // db.close();
      });
    });
	 };
    

    deleteCollection.getRoutes = function(cb) {
      var routes = [
        {
          method: 'post',
          path: '/api/mongoDB/delete_collection',
          auth_required: false,
          content_type: 'application/json'
        }
      ];
      cb(null, routes);
    };

    //exports
    return deleteCollection;
};