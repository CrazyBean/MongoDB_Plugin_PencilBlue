(function() {

  insertIntoDB = function() {
   

    var doc1 = {'title':'doc1', 'description':'MogoDB is a non-sql database1'};

    $.post('/api/mongoDB/connect_db', JSON.stringify(doc1), function(result) {
    });
  }
}());
