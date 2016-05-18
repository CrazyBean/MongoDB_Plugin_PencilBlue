(function() {
  $('#addNewCollection_form').validate();

      addNewCollection = function() {
        if(!$('#new_collecname').val().length) {
           alert('Please enter a collection name');
           return;
        }else{
            var new_collec_checkbox =document.getElementById("new_collec_checkbox"); 
            if(new_collec_checkbox.checked == true){
              $('#new_collec_checkbox').val(true);
              
            }else{
              $('#new_collec_checkbox').val(false);
            }
            var sizeNums = 0;
            if($('#new_collec_size').val().length > 0){
              // alert($('#new_collec_size').val().length);
              sizeNum = Number($('#new_collec_size').val());
              if(!isNaN(sizeNum)){
                
              }else{
                alert("Size should be numbers");
                return;
              }
            }
            var macDocNums = 0;
            if($('#new_collec_maxDoc').val().length > 0){
              // alert($('#new_collec_size').val().length);
              macDocNums = Number($('#new_collec_maxDoc').val());
              if(!isNaN(macDocNums)){
                
              }else{
                alert("Max Documents should be numbers");
                return;
              }
            }
            var capped = false;
            if($("#new_collec_checkbox").prop('checked') == true){
                capped = true;
            }else{
                capped = false;
            }
            var postData = {
                add_collec_dbname : $('#add_collec_dbname').val(),
                new_collecname : $('#new_collecname').val(),
                capped : capped,
                sizeNums : sizeNums,
                macDocNums : macDocNums

            }

            $.post('/api/mongoDB/add_newCollec_toMGDB',JSON.stringify(postData),function(result){
                // alert(JSON.stringify(result.data));
                if(JSON.stringify(result.data) != null){
                    alert("Successfully add new collection: "+ result.data +". The page will reload now.");
                    window.location.reload();
                }
                // alert(JSON.stringify(result));
            });
        }
  }
}());
