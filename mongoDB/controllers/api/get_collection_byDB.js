// Retrieve


module.exports = function(pb) {
    
    //pb depdencies
    var util = pb.util;
    
    function getCollection() {};
    util.inherits(getCollection, pb.BaseController);

    var hostAndPort = pb.config.db.servers[0];

    getCollection.prototype.render = function(cb){
    	 var self = this;
       this.getJSONPostParams(function(err, post) {
        var dbname = self.hasRequiredParams(post, ['name']);
        
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect(hostAndPort+post.name, function(err, db) {
        if(err) { return console.dir(err); }

        db.listCollections().toArray(function(err, collections){
        //collections = [{"name": "coll1"}, {"name": "coll2"}]
          cb({content: pb.BaseController.apiResponse(pb.BaseController.API_SUCCESS, post.name,collections)});
          db.close();
        });
        
        
        });
      });
	 };
    

    getCollection.getRoutes = function(cb) {
      var routes = [
        {
          method: 'post',
          path: '/api/mongoDB/get_collection_byDB',
          auth_required: false,
          content_type: 'application/json'
        }
      ];
      cb(null, routes);
    };

    //exports
    return getCollection;
};