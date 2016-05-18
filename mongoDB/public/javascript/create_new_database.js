(function() {
  $('#createNewDB_form').validate();

      createNewDB = function() {
        if(!$('#new_dbname').val().length) {
           alert('Please enter a DB name');
           return;
        }else{
            var postData = {
                new_dbname : $('#new_dbname').val()
            }

            $.post('/api/mongoDB/create_newdb_toMGDB',JSON.stringify(postData),function(result){
                // alert(JSON.stringify(result.data));
                if(JSON.stringify(result.data) != null){
                    alert("Successfully created new DB: "+ result.data +". The page will reload now.");
                    window.location.reload();
                }
                // alert(JSON.stringify(result));
            });
        }
  }
}());
