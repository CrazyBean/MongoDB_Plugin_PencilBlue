(function() {

  deletCollection = function(dbname,collectionname) {
    

    var postData = {
      dbname: dbname,
      collectionname: collectionname
    };
    //alert(JSON.stringify(postData));
    $.post('/api/mongoDB/delete_collection', JSON.stringify(postData), function(result) {
      //alert(JSON.stringify(result))
      if(result.code == 0){
        alert("Successfully Delete");
        window.location.reload(); 
      }else{
        alert("Delete Error");
        window.location.reload(); 
      }
    });
  }
}());