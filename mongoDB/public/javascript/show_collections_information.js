(function() {

  showCollectionInfo = function(dbname,collectionname,docs) {
        var postData = {
            dbname : dbname,
            collectionname : collectionname
        };

        var dbPanel=document.getElementById("dbPanel");  
        dbPanel.style.display = "none";
        var collectionPanel=document.getElementById("collectionPanel");  
        collectionPanel.style.display = "";

        var collecPH = document.getElementById("collectionConent-panel-heading");
        $('#collectionConent-panel-heading').empty();
        var collecPHTitle = document.createElement('div');
        collecPHTitle.id = "collectionConent-panel-title";
        // alert(collectionname);
        collecPHTitle.innerHTML = "<h4>Contents of Collection : "+collectionname+"</h4>";
        collecPH.appendChild(collecPHTitle);

        var collecPB = document.getElementById("collectionConent-panel-body");
        // $('#collectionConent-panel-body').empty();
        var JSONTab = document.getElementById("JSON");
        $('#JSONTab').empty();
        var noDataDiv = document.getElementById("noDataDiv");

        var JSONtable_tbody = document.getElementById("JSONtable_tbody");
        $('#JSONtable_tbody').empty();
        var TreeTableTab = document.getElementById("tree_table");
        $('#tree_table').empty();

        var collectionsAmount = 0;

        if(docs != null){
            collectionsAmount = docs.data.length;
            if(collectionsAmount == 0){
                    noDataDiv.style.display = "";
                }else{
                    noDataDiv.style.display = "none";
                    for(var i = 0; i < collectionsAmount; i++){
                        
                        var collecTextTr = document.createElement('tr');
                        collecTextTr.id = "collecTextTr_" + i;
                      
                         //set up textarea
                        var collecTextTd = document.createElement('td');
                        collecTextTd.id = "collecTextTd_" + i;

                        var collecTextPre = document.createElement('pre');
                        collecTextPre.id = "collecTextPre_" + i;

                        var collecTextArea = document.createElement('textarea');
                        collecTextArea.id = "collecTextArea_" + i;
                        collecTextArea.setAttribute('cols',70);
                        // collecTextArea.setAttribute('rows',8);
                        collecTextArea.setAttribute('style',"height: 100px;");

                        collecTextArea.innerText = JSON.stringify(docs.data[i]);

                        collecTextPre.appendChild(collecTextArea);
                        collecTextTd.appendChild(collecTextPre);
                        collecTextTr.appendChild(collecTextTd);
                        //end Text area

                        //set up buttons
                        var collecButtonTd = document.createElement('td');
                        collecButtonTd.id = "collecButtonTd_" + i;

                        var divButtons = document.createElement('div');

                        var collecEditButton = document.createElement('button');
                        var buttonName = document.createTextNode("Edit");
                        collecEditButton.appendChild(buttonName);
                        collecEditButton.id = "collecEditButton_" + i;
                        collecEditButton.type = "button";
                        collecEditButton.className = "btn btn-primary";
                        collecEditButton.setAttribute('data-toggle',"modal");
                        collecEditButton.setAttribute('data-target',"#edit_document");
                        collecEditButton.onclick = function(){
                            var collectionName = $(this).attr("id").split("_");
                            //var id = collectionName[1];
                            var old_file = docs.data[collectionName[1]];
                            // alert(JSON.stringify(old_file));
                            var editModalBody = document.getElementById("edit_modal");
                            $('#edit_modal').empty();
                            var id = 0;
                            $.each(old_file, function(key, value){
                                var isObject = typeof(value);
                                if(isObject == 'object'){
                                    //manageJson(value);
                                }else if(key != "_id"){
                                   
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
                                    oneFieldInput.value = value;
                                    // oneFieldInput.setAttribute("placeholder",key);
                                    
                                    oneFieldDiv.appendChild(oneFieldLabel);
                                    oneFieldDiv.appendChild(oneFieldInput);
                                    editModalBody.appendChild(oneFieldDiv);


                                }
                            });
                            $("#update_subimit").click(function(){
                                var new_document = {};
                                //alert(JSON.stringify(old_file));
                                $.each(old_file, function(key, value){
                                    var isObject = typeof(value);
                                    if(isObject == 'object'){
                                        new_document[key] = value;
                                    }else{
                                        new_document[key] = $('#'+key+"_input").val();
                                    }
                                });
                                //alert(JSON.stringify(new_document));
                                var key = "_id";
                                delete new_document[key];
                                // delete old_file[key];
                                var updateData = {
                                    dbName : dbname,
                                    collectionName : collectionname,
                                    old_document: JSON.stringify(old_file),
                                    json_id : old_file[key],
                                    new_document:  JSON.stringify(new_document)
                                };
                                $.post('/api/mongoDB/update_document', JSON.stringify(updateData), function(result){
                                   // alert(JSON.stringify(result));
                                    if(result.message != 'Update Successful'){
                                        alert(result.message);
                                       
                                    }else{
                                        $('#edit_document').modal('hide')
                                        alert("Update Document Successful");
                                        window.location.reload();
                                        
                                    }
                                     
                                 });
                                //alert(JSON.stringify(new_document));    
                                    
                            });

                        };

                        divButtons.appendChild(collecEditButton);

                        var spaceSpan_1 = document.createElement('span');
                        spaceSpan_1.id = "spaceSpan_1_" + i;
                        spaceSpan_1.innerHTML = "&nbsp&nbsp&nbsp";

                        divButtons.appendChild(spaceSpan_1);
                        
                        var collecDelButton = document.createElement('button');
                        var buttonName = document.createTextNode("Delete");
                        collecDelButton.appendChild(buttonName);
                        collecDelButton.id = "collecDelButton_" + i;
                        collecDelButton.type = "button";
                        collecDelButton.className = "btn btn-primary";
                        collecDelButton.onclick = function(){
                            var ask = window.confirm("Are you sure you want to delete this document?");
                            if (ask){
                                var collectionName = $(this).attr("id").split("_");
                                var  json_file = docs.data[collectionName[1]];
                               
                               var key = "_id";
                               // delete json_file[key];
                                var deleteData = {
                                    dbName : dbname,
                                    collectionName : collectionname,
                                    json_id : json_file[key],
                                    json_document:  JSON.stringify(json_file)
                                };
                                 //alert(JSON.stringify(deleteData));
                                 $.post('/api/mongoDB/delete_document', JSON.stringify(deleteData), function(result){
                                    //alert(JSON.stringify(result));
                                    if(result.code > 0){
                                        alert("Invaild Delete Document");
                                        showCollectionInfo(dbname,collectionname);
                                    }else{
                                        alert("Delete Document Successful");
                                        showCollectionInfo(dbname,collectionname);
                                    }
                                     
                                 });
                            }
                            
                        };
                        divButtons.appendChild(collecDelButton);

                        collecButtonTd.appendChild(divButtons);
                        collecTextTr.appendChild(collecButtonTd);
                        //end Text area

                        JSONtable_tbody.appendChild(collecTextTr);
                    }
                
               

                 }//else
        }else{
              $.post('/api/mongoDB/get_collection_information', JSON.stringify(postData), function(collections) {
                collectionsAmount = collections.data.length;
                if(collectionsAmount == 0){
                    noDataDiv.style.display = "";
                }else{
                    noDataDiv.style.display = "none";
                    for(var i = 0; i < collectionsAmount; i++){
                        
                        var collecTextTr = document.createElement('tr');
                        collecTextTr.id = "collecTextTr_" + i;
                      
                         //set up textarea
                        var collecTextTd = document.createElement('td');
                        collecTextTd.id = "collecTextTd_" + i;

                        var collecTextPre = document.createElement('pre');
                        collecTextPre.id = "collecTextPre_" + i;

                        var collecTextArea = document.createElement('textarea');
                        collecTextArea.id = "collecTextArea_" + i;
                        collecTextArea.setAttribute('cols',70);
                        // collecTextArea.setAttribute('rows',8);
                        collecTextArea.setAttribute('style',"height: 100px;");
                        collecTextArea.setAttribute('readonly',"readonly");

                        collecTextArea.innerText = JSON.stringify(collections.data[i]);
                        collecTextPre.appendChild(collecTextArea);
                        collecTextTd.appendChild(collecTextPre);
                        collecTextTr.appendChild(collecTextTd);
                        //end Text area

                        //set up buttons
                        var collecButtonTd = document.createElement('td');
                        collecButtonTd.id = "collecButtonTd_" + i;

                        var divButtons = document.createElement('div');
                        var spaceSpan = document.createElement('span');
                        spaceSpan.id = "spaceSpan";
                        spaceSpan.innerHTML = "&nbsp&nbsp&nbsp";

                        var collecEditButton = document.createElement('button');
                        var buttonName = document.createTextNode("Edit");
                        collecEditButton.appendChild(buttonName);
                        collecEditButton.id = "collecEditButton_" + i;
                        collecEditButton.type = "button";
                        collecEditButton.className = "btn btn-primary";
                        collecEditButton.setAttribute('data-toggle',"modal");
                        collecEditButton.setAttribute('data-target',"#edit_document");

                        collecEditButton.onclick = function(){
                            var collectionName = $(this).attr("id").split("_");
                            //var id = collectionName[1];
                            var old_file = collections.data[collectionName[1]];
                            var editModalBody = document.getElementById("edit_modal");
                            $('#edit_modal').empty();
                            var id = 0;
                            $.each(old_file, function(key, value){
                                var isObject = typeof(value);
                                if(isObject == 'object'){
                                    //manageJson(value);
                                }else if(key != "_id"){
                                   
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
                                    oneFieldInput.value = value;
                                    // oneFieldInput.setAttribute("placeholder",key);
                                    
                                    oneFieldDiv.appendChild(oneFieldLabel);
                                    oneFieldDiv.appendChild(oneFieldInput);
                                    editModalBody.appendChild(oneFieldDiv);


                                }
                            });
                            $("#update_subimit").click(function(){
                                var new_document = {};
                                //alert(JSON.stringify(old_file));
                                $.each(old_file, function(key, value){
                                    var isObject = typeof(value);
                                    if(isObject == 'object'){
                                        new_document[key] = value;
                                    }else{
                                        new_document[key] = $('#'+key+"_input").val();
                                    }
                                });
                                //alert(JSON.stringify(new_document));
                                var key = "_id";
                                delete new_document[key];
                                // delete old_file[key];
                                var updateData = {
                                    dbName : dbname,
                                    collectionName : collectionname,
                                    json_id : old_file[key],
                                    old_document: JSON.stringify(old_file),
                                    new_document:  JSON.stringify(new_document)
                                };
                                $.post('/api/mongoDB/update_document', JSON.stringify(updateData), function(result){
                                   // alert(JSON.stringify(result));
                                    if(result.message != 'Update Successful'){
                                        alert(result.message);
                                       
                                    }else{
                                        $('#edit_document').modal('hide')
                                        alert("Update Document Successful");
                                        window.location.reload();
                                        
                                    }
                                     
                                 });
                                //alert(JSON.stringify(new_document));    
                                    
                            });

                        };



                        divButtons.appendChild(collecEditButton);

                        divButtons.appendChild(spaceSpan);
                        
                        var collecDelButton = document.createElement('button');
                        var buttonName = document.createTextNode("Delete");
                        collecDelButton.appendChild(buttonName);
                        collecDelButton.id = "collecDelButton_" + i;
                        collecDelButton.type = "button";
                        collecDelButton.className = "btn btn-primary";
                        collecDelButton.onclick = function(){
                            var ask = window.confirm("Are you sure you want to delete this document?");
                            if (ask){
                                var collectionName = $(this).attr("id").split("_");
                                var  json_file = collections.data[collectionName[1]];
                               
                               var key = "_id";
                               // delete json_file[key];
                               // alert(json_file[key]);
                                var deleteData = {
                                    dbName : dbname,
                                    collectionName : collectionname,
                                    json_id : json_file[key],
                                    json_document:  JSON.stringify(json_file)
                                };
                                 // alert(JSON.stringify(deleteData));
                                 $.post('/api/mongoDB/delete_document', JSON.stringify(deleteData), function(result){
                                    // alert(JSON.stringify(result));
                                    if(result.message != "Delete Successful"){
                                        alert("Invaild Delete Document");
                                        showCollectionInfo(dbname,collectionname,null);
                                    }else{
                                        alert("Delete Document Successful");
                                        showCollectionInfo(dbname,collectionname,null);
                                    }
                                     
                                 });
                            }
                            
                        };

                        divButtons.appendChild(collecDelButton);

                        collecButtonTd.appendChild(divButtons);
                        collecTextTr.appendChild(collecButtonTd);
                        //end Text area

                        JSONtable_tbody.appendChild(collecTextTr);
                    }
                
               

                 }//else
                });
        }//end outside else
        
      
  
    }//end function
  
}());
