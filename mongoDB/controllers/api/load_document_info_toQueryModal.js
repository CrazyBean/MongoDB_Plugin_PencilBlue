
module.exports = function(pb) {
    
    //pb depdencies
    var util = pb.util;
    
    function loadDocInfo2QueryModal() {};
    util.inherits(loadDocInfo2QueryModal, pb.BaseController);

    var hostAndPort = pb.config.db.servers[0];

    loadDocInfo2QueryModal.prototype.render = function(cb){
    	  var self = this;
        this.getJSONPostParams(function(err, post) {
        var dbname = post.dbname;
        var collecname = post.collecname;

        var MongoClient = require('mongodb').MongoClient;
        var assert = require('assert');
        MongoClient.connect(hostAndPort + dbname, function(err, db) {
           if(err) { return console.dir(err); }
           db.collection(collecname).findOne(function(err, doc) {
              if(util.isError(err)){
                cb({content: pb.BaseController.apiResponse(pb.BaseController.API_ERROR, 'Invalid Loading Doc Info',err)});
                db.close();
                return;
              }else{
                cb({content: pb.BaseController.apiResponse(pb.BaseController.API_SUCCESS, 'Load Doc Info to Query Model',doc)});
                db.close();
              }
           });
           // db.close();
        });//end connect
      });//end postParams
	 };
    

    loadDocInfo2QueryModal.getRoutes = function(cb) {
      var routes = [
        {
          method: 'post',
          path: '/api/mongoDB/load_document_info_toQueryModal',
          auth_required: false,
          content_type: 'application/json'
        }
      ];
      cb(null, routes);
    };

    //exports
    return loadDocInfo2QueryModal;
};

