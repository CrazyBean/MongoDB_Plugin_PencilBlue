(function() {
  $('#queryDocuments_form').validate();

      queryDocuments = function() {
        if(!$('#queryDocuments_collecname').val().length || !$('#queryDocuments_dbname').val().length ) {
           alert('Can not find database or collection');
           return;
        }else{
            var dbname = $('#queryDocuments_dbname').val();
            var collecname = $('#queryDocuments_collecname').val();
            var skip = $('#skip').val();
            if($('#skip').val().length > 0){
              if(!isNaN(skip)){

              }else{
                alert("Skip should be numbers");
                return;
              }
            }else{
              alert("Skip filed can not be empty");
              return;
            }
            var limit = $('#limit').val();
            var queryBox = $('#queryBox').val();

            
            var postData = {
                dbname : $('#queryDocuments_dbname').val(),
                collecname : $('#queryDocuments_collecname').val(),
                skip : skip,
                limit : limit,
                queryBox : queryBox
            }
            // alert(JSON.stringify(postData));
            $.post('/api/mongoDB/query_documents_fromOneCollection',JSON.stringify(postData),function(result){
                if(result.code == null){
                  alert("Invalid JSON format input");
                  return;
                }else{
                  showCollectionInfo(dbname,collecname,result);
                }
                
            });
        }
  }
}());
