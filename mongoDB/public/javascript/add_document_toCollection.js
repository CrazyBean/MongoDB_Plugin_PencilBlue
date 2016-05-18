(function() {
  $('#add_document').validate();

  addDocument = function() {
    if(!$('#json_document').val().length) {
      alert("Please Input Document");
      return;
    }


    var postData = {
      dbName: $('#dbName').val(),
      collectionName: $('#collectionName').val(),
      json_document: $('#json_document').val()
    }
    //alert(JSON.stringify(postData));
    $.post('/api/mongoDB/add_document_toCollection', JSON.stringify(postData), function(result) {
     // alert(JSON.stringify(result))
      if(result.message != 'Insert Success'){
        alert(result.message);
      }else{
        alert("Successfully Insert");
        window.location.reload(); 
      }
    });
  }
}());
