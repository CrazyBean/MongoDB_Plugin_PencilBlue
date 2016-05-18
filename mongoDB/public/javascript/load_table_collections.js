(function() {

  getCollection = function(databaseName) {

    var dbname = {
        name: databaseName
    }
    // alert(databaseName);
    $.post('/api/mongoDB/get_collection_byDB', JSON.stringify(dbname), function(collection){
        //alert(JSON.stringify(collection));
        $('#collection').empty();
        for (var j = collection.data.length - 1; j >= 0; j--) {
            if(collection.data[j].name != 'system.indexes'){
                $('#collection').append(
                "<li> <a  a_collection_id = '"+collection.data[j].name+"''><i class=''></i>"+collection.data[j].name+"<span class='fa arrow' id='"+collection.data[j].name+"' ></span></a> "+
                    // "<div >"+
                         "<ul class='nav nav-third-level' id='"+collection.data[j].name+"_collection'   style='display: none'>"+
                            "<li ><a href='#' id='"+databaseName+"_"+collection.data[j].name+"' data-toggle='modal' data-target='#myModal' ><span>Create Document</span></a>"+
                            "</li>"+
                            "<li ><a href='#' delete_collection_id='"+databaseName+"_"+collection.data[j].name+"' ><span>Delete Collection</span></a>"+
                            "</li>"+
                        "</ul>"+
                     //"</div>"+
                "</li>"
               
                );
            }
        };
        $("#collection li a").click(function(dbs){          
                var collectionName = $(this).attr("a_collection_id");
                if(collectionName != null){
                    showCollectionInfo(databaseName,collectionName,null);
                    $("#queryDocuments_collecname").val(collectionName);//updata new
                    $("#queryDocuments_dbname").val(databaseName);
                    loadDocInfo(databaseName,collectionName);
                }
        });//end click function  
        
        $("#collection li a span").click(function(){    
                //alert(this.id);  
                var id = this.id+'_collection';    
                if($('#'+id).is(':visible')){
                    $('#'+id).hide();
                }else{
                    $('#'+id).show();
                }
        });//end click function 
         
        $("#collection li ul li a").click(function(){    
                var delte_db_collection = $(this).attr("delete_collection_id");
                if(delte_db_collection != null){
                    var ask = window.confirm("Are you sure you want to delete this collection?");
                    if (ask){
                        var db_collection = delte_db_collection.split("_");
                        deletCollection(db_collection[0],db_collection[1]);
                    }
                }else{
                    var db_collection = this.id.split("_");  
                    $('#dbName').val(db_collection[0]);
                    $('#collectionName').val(db_collection[1]);
                }
                
        });
    });
  }//end g
}());



