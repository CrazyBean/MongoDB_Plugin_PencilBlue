(function() {
  $('#dropPointedDB_form').validate();

      dropPointedDB = function() {
    
        var postData = {
            drop_pointed_dbname : $('#pointed_dbname').val()
        }

        $.post('/api/mongoDB/drop_database_fromMGDB',JSON.stringify(postData),function(result){
            // alert(JSON.stringify(result));
            if(JSON.stringify(result.data) == "true"){
                alert("Successfully dropped DB: "+ $('#pointed_dbname').val() +". The page will reload now.");
                window.location.reload();
            }
            // alert(JSON.stringify(result));
        });
    }

  
}());
