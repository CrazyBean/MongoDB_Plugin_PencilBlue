(function() {

  loadDocInfo = function(databaseName,collectionName) {
    if(databaseName == null || collectionName == null ) {
           alert('Can not find database or collection');
           return;
        }else{
            var postData = {
                dbname: databaseName,
                collecname: collectionName
            }
            var query_modal_noDataDiv=document.getElementById("query_modal_noDataDiv"); 
            var query_modal_fields=document.getElementById("query_modal_fields");  
            var query_modal_options=document.getElementById("query_modal_options");  
            var KVPairQueryModal_submit=document.getElementById("KVPairQueryModal_submit");  
            
            $.post('/api/mongoDB/load_document_info_toQueryModal', JSON.stringify(postData), function(doc){
                if(doc.data == null){
                    query_modal_noDataDiv.style.display = "";
                    query_modal_fields.style.display = "none";
                    query_modal_options.style.display = "none";
                    KVPairQueryModal_submit.style.display = "none";
                    return;
                }else{
                    query_modal_noDataDiv.style.display = "none";
                    query_modal_fields.style.display = "";
                    query_modal_options.style.display = "";
                    KVPairQueryModal_submit.style.display = "";
                    var docInfo = doc.data;
                    var docInfoArray = [];
                    var docInfoKeys = "";
                    var queryModalFields = document.getElementById("query_modal_fields");
                    $('#query_modal_fields').empty();
                    // var queryModalBody = document.getElementById("query_modal_body");
                    // $('#query_modal_body').empty();
                    
                    for(var key in docInfo){
                        if(key.indexOf("_id") >= 0 || key.indexOf("password") >= 0 || key.indexOf("created") >= 0
                            || key.indexOf("last_modified") >= 0 || key.indexOf("admin") >= 0){
                            continue;
                        }

                        var isObject = typeof(docInfo[key]);
                        if(isObject == 'object'){
                            continue;
                        }else{
                            docInfoKeys = docInfoKeys + "," + key;
                            docInfoArray[key] = docInfo[key];
                            var oneFieldDiv = document.createElement("div");
                            oneFieldDiv.id = key + "_div";
                            oneFieldDiv.className = "form-group";
                            var oneFieldLabel = document.createElement("label");
                            oneFieldLabel.id = key + "_label";
                            oneFieldLabel.innerText = key + " : ";

                            var oneFieldInput = document.createElement("input");
                            oneFieldInput.id = key + "_input";
                            oneFieldInput.type = "text";
                            oneFieldInput.name = key + "_input";
                            oneFieldInput.className = "form-control";
                            // oneFieldInput.setAttribute("placeholder",key);
                            
                            oneFieldDiv.appendChild(oneFieldLabel);
                            oneFieldDiv.appendChild(oneFieldInput);
                            queryModalFields.appendChild(oneFieldDiv);
                        }
                        
                    }//end for loop
                    var docKeys = document.getElementById("docKeys");
                    $('#docKeys').val(docInfoKeys);

                }
               
            });
        }

    
  }//end loadDocInfo

}());
