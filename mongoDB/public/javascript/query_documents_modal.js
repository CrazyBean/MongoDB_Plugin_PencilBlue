(function() {
  $('#KVPairQueryModal_form').validate();

      KVPairQueryDocuments = function() {
        if(!$('#queryDocuments_collecname').val().length || !$('#queryDocuments_dbname').val().length ) {
           alert('Can not find database or collection');
           return;
        }else{
            var dbname = $('#queryDocuments_dbname').val();
            var collecname = $('#queryDocuments_collecname').val();
            var skip = $('#KVQueryModal_skip').val();
            if($('#KVQueryModal_skip').val().length > 0){
              if(!isNaN(skip)){

              }else{
                alert("Skip should be numbers");
                return;
              }
            }else{
              alert("Skip filed can not be empty");
              return;
            }
            var limit = $('#KVQueryModal_limit').val();
            
            var queryBox = {};
            var docInfoKeys = $('#docKeys').val().split(",");
            for(var i = 1; i < docInfoKeys.length; i++){
              var fieldKey = docInfoKeys[i];
              if($('#' + fieldKey + "_input").val() != ""){
                queryBox[fieldKey] = $('#' + fieldKey + "_input").val();  
              }
                  
            }
            // alert(queryBox);
            var postData = {
                dbname : $('#queryDocuments_dbname').val(),
                collecname : $('#queryDocuments_collecname').val(),
                skip : skip,
                limit : limit
            }

            postData["queryBox"] = JSON.stringify(queryBox);
        
          $.post('/api/mongoDB/query_documents_fromOneCollection',JSON.stringify(postData),function(result){
              // alert(JSON.stringify(result));
              if(result.code == null){
                alert("Invalid JSON format input");
                return;
              }else{
                // $('#KVPairQueryModal').hide();
                showCollectionInfo(dbname,collecname,result);

              }
              
          });
        }
  }
}());
