// Retrieve


module.exports = function(pb) {
    
    //pb depdencies
    var util = pb.util;
    
    function insertIntoDB() {};
    util.inherits(insertIntoDB, pb.BaseController);

    insertIntoDB.prototype.render = function(cb){
    	var MongoClient = require('mongodb').MongoClient;

	// Connect to the db
	MongoClient.connect("mongodb://localhost:27017/runoob", function(err, db) {
	  if(err) { return console.dir(err); }

	  var collection = db.collection('test');
	  var doc1 = {'title':'doc1', 'description':'MogoDB is a non-sql database1'};
	  var doc2 = {'title':'doc2', 'description':'MogoDB is a non-sql database2'};

	  collection.insert(doc2);

		});
	};
    

    insertIntoDB.getRoutes = function(cb) {
      var routes = [
        {
          method: 'post',
          path: '/api/mongoDB/connect_db',
          auth_required: false,
          content_type: 'application/json'
        }
      ];
      cb(null, routes);
    };

    //exports
    return insertIntoDB;
};