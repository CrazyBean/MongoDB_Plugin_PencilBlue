
module.exports = function(pb) {
    
    //pb depdencies
    var util = pb.util;
    
    function addNewCollec2MGDB() {};
    util.inherits(addNewCollec2MGDB, pb.BaseController);

    var hostAndPort = pb.config.db.servers[0];

    addNewCollec2MGDB.prototype.render = function(cb){
    	  var self = this;
        this.getJSONPostParams(function(err, post) {
        var dbname = post.add_collec_dbname;
        var new_collecname = post.new_collecname;
        var capped = post.capped;
        var sizeNums = post.sizeNums;
        var maxDocNums = post.maxDocNums;

        var MongoClient = require('mongodb').MongoClient;
        var assert = require('assert');
        MongoClient.connect(hostAndPort + dbname, function(err, db) {
           if(err) { return console.dir(err); }
           db.createCollection(new_collecname, {capped:capped, size:sizeNums, max:maxDocNums} ,function(err, result) {
            if(err) { return console.dir(err); }
            cb({content: pb.BaseController.apiResponse(pb.BaseController.API_SUCCESS, 'Create new collection',new_collecname)});
            db.close();
           });//end createCollection
           // db.close();
        });
      });
	 };
    

    addNewCollec2MGDB.getRoutes = function(cb) {
      var routes = [
        {
          method: 'post',
          path: '/api/mongoDB/add_newCollec_toMGDB',
          auth_required: false,
          content_type: 'application/json'
        }
      ];
      cb(null, routes);
    };

    //exports
    return addNewCollec2MGDB;
};