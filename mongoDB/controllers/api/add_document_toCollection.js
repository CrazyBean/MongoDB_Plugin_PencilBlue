// Retrieve


module.exports = function(pb) {
    
    //pb depdencies
    var util = pb.util;
    
    function addDocument() {};
    util.inherits(addDocument, pb.BaseController);

    var hostAndPort = pb.config.db.servers[0];

    addDocument.prototype.render = function(cb){
    	var self = this;

      this.getJSONPostParams(function(err, post) {

        var dbName = post.dbName;
        var collectionName = post.collectionName;
        var json_documents = post.json_document;

        try{
          json_documents = JSON.parse(post.json_document);
        }catch(e){
          cb({content: pb.BaseController.apiResponse(pb.BaseController.API_ERROR, 'Invalid Input',e)});
          return;
        }

        var MongoClient = require('mongodb').MongoClient;
        MongoClient.connect(hostAndPort+dbName, function(err, db) {
        if(err) { return console.dir(err); }
          db.collection(collectionName).insert(json_documents, function(err, records){
            if(util.isError(err)) {
              cb({
                content: pb.BaseController.apiResponse(pb.BaseController.API_ERROR, 'Invalid Insert')
              });
              db.close();
              return;
             }
             cb({content: pb.BaseController.apiResponse(pb.BaseController.API_SUCCESS, 'Insert Success')});
             db.close();
          });

      });
    });
	 };
    

    addDocument.getRoutes = function(cb) {
      var routes = [
        {
          method: 'post',
          path: '/api/mongoDB/add_document_toCollection',
          auth_required: false,
          content_type: 'application/json'
        }
      ];
      cb(null, routes);
    };

    //exports
    return addDocument;
};