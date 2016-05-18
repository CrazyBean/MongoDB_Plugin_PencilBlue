// Retrieve


module.exports = function(pb) {
    
    //pb depdencies
    var util = pb.util;
    
    function getCollectionInformation() {};
    util.inherits(getCollectionInformation, pb.BaseController);

    getCollectionInformation.prototype.render = function(cb){
        var self = this;

        this.getJSONPostParams(function(err, post) {
            var dbname = post.dbname;
            var collectionname = post.collectionname;
            
            var Db = require('mongodb').Db,
            MongoClient = require('mongodb').MongoClient,
            Server = require('mongodb').Server,
            ReplSetServers = require('mongodb').ReplSetServers,
            ObjectID = require('mongodb').ObjectID,
            Binary = require('mongodb').Binary,
            GridStore = require('mongodb').GridStore,
            Grid = require('mongodb').Grid,
            Code = require('mongodb').Code,
            // BSON = require('mongodb').pure().BSON,
            assert = require('assert');
            var localhost = "localhost";
            var port = 27017;
            var db = new Db(dbname, new Server(localhost, port));
            // Establish connection to db
            db.open(function(err, db) {
                assert.equal(null, err);
                db.collection(collectionname,function(err,collection){
                    collection.find().toArray(function (err, items) { 
                        cb({content: pb.BaseController.apiResponse(pb.BaseController.API_SUCCESS, 'Send Collection Information',items)});
                        db.close();
                    });
                    
                });
                

            });
            // db.close();

        });//end getJsonPostParams

    };//end render
    

    getCollectionInformation.getRoutes = function(cb) {
      var routes = [
        {
          method: 'post',
          path: '/api/mongoDB/get_collection_information',
          auth_required: false,
          content_type: 'application/json'
        }
      ];
      cb(null, routes);
    };

    //exports
    return getCollectionInformation;
};