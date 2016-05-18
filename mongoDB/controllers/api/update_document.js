// Retrieve


module.exports = function(pb) {
    
    //pb depdencies
    var util = pb.util;
    
    function updateCollection() {};
    util.inherits(updateCollection, pb.BaseController);

    var hostAndPort = pb.config.db.servers[0];

    updateCollection.prototype.render = function(cb){
    	var self = this;

      this.getJSONPostParams(function(err, post) {

        var dbName = post.dbName;
        var collectionName = post.collectionName;
        var json_id = post.json_id;
        var ObjectId = require('mongodb').ObjectID;

        var MongoClient = require('mongodb').MongoClient;

        
        var old_doc = JSON.parse(post.old_document);
        var id = {
          _id:old_doc._id
        };
        var new_doc = {
          $set : JSON.parse(post.new_document)
        };
       
        MongoClient.connect(hostAndPort+dbName, function(err, db) {
        if(err) { return console.dir(err); }
          db.collection(collectionName).findAndModify({"_id":ObjectId(json_id)},[['_id','asc']],new_doc,function(err, records){
            if(util.isError(err)) {
              cb({
                content: pb.BaseController.apiResponse(pb.BaseController.API_ERROR, "Invalid Update")
              });
              db.close();
              return;
             }
             cb({content: pb.BaseController.apiResponse(pb.BaseController.API_SUCCESS, "Update Successful")});
             db.close();
          });
          //db.close();
      });
    });
	 };
    

    updateCollection.getRoutes = function(cb) {
      var routes = [
        {
          method: 'post',
          path: '/api/mongoDB/update_document',
          auth_required: false,
          content_type: 'application/json'
        }
      ];
      cb(null, routes);
    };

    //exports
    return updateCollection;
};