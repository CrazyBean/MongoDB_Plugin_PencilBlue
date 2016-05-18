// Retrieve


module.exports = function(pb) {
    
    //pb depdencies
    var util = pb.util;
    
    function deleteDocument() {};
    util.inherits(deleteDocument, pb.BaseController);

    var hostAndPort = pb.config.db.servers[0];

    deleteDocument.prototype.render = function(cb){
      var self = this;

      this.getJSONPostParams(function(err, post) {

        var dbName = post.dbName;
        var collectionName = post.collectionName;
        var json_document = JSON.parse(post.json_document);
        var json_id = post.json_id;

        var ObjectId = require('mongodb').ObjectID;
        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect(hostAndPort+dbName, function(err, db) {
        if(err) { return console.dir(err); }
          // db.collection(collectionName).remove(json_document, function(err, numberOfRemovedDocs){
            db.collection(collectionName).remove({"_id":ObjectId(json_id)}, function(err, numberOfRemovedDocs){
            if(util.isError(err)) {
              cb({
                content: pb.BaseController.apiResponse(pb.BaseController.API_ERROR, "Invalid Delete Document")
              });
              db.close();
              return;
            }
             cb({content: pb.BaseController.apiResponse(pb.BaseController.API_SUCCESS, "Delete Successful")});
             db.close();
          });
          // db.close();
      });
    });
   };
    

    deleteDocument.getRoutes = function(cb) {
      var routes = [
        {
          method: 'post',
          path: '/api/mongoDB/delete_document',
          auth_required: false,
          content_type: 'application/json'
        }
      ];
      cb(null, routes);
    };

    //exports
    return deleteDocument;
};