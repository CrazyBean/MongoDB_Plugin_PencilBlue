(function() {

  showTableInfo = function(dbname) {
    
        var postData = {
            dbname : dbname
        };
        var welcomePanel = document.getElementById("welcomePanel");  
        welcomePanel.style.display = "none";//remove the welcome sentence

        var collectionPanel = document.getElementById("collectionPanel");  
        collectionPanel.style.display = "none";
        var dbPanel=document.getElementById("dbPanel");  
        dbPanel.style.display = "";
        
        var divPH = document.getElementById('db-panel-heading');//create panel-heading
        $('#db-panel-heading').empty();
        var divPHTitle = document.createElement('div');
        divPHTitle.id = "db-panel-title";
        divPHTitle.innerHTML = "<h4>Statistics : "+dbname+"</h4>";
        divPH.appendChild(divPHTitle);


        var table = document.getElementById("dataBaseInfoTables");

        var tableHead = document.getElementById("thead");
        $('#thead').empty();//create thead
        var trHead = document.createElement('tr');;
        var th = [];
        th["Key"] = document.createElement('th');
        th["Key"].innerText = "Key";
        trHead.appendChild(th["Key"]);
        th["Value"] = document.createElement('th');
        th["Value"].innerText = "Value";
        trHead.appendChild(th["Value"]);
        th["Type"] = document.createElement('th');
        th["Type"].innerText = "Type";
        trHead.appendChild(th["Type"]);
        tableHead.appendChild(trHead);
        table.appendChild(tableHead);

        $('#tbody').empty();//create tbody
        var tableBody = document.getElementById("tbody");
        var tr = [];
        var tdKeyData = [];
        var tdValData = [];
        var tdTypeData = [];
        var td = [];
       
        $.post('/api/mongoDB/get_table_information', JSON.stringify(postData), function(dbs) {
            var dbInfoSet = dbs.data;
            for(var str in dbInfoSet){ 
                tr[str] = document.createElement('tr');
                tdKeyData[str] = document.createElement('td');
                tdValData[str] = document.createElement('td');
                tdTypeData[str] = document.createElement('td');

                switch (str){
                    case "serverUsed":
                        tdKeyData[str].innerText = str;
                        tr[str].appendChild(tdKeyData[str]);
                        tdValData[str].innerText = dbInfoSet[str];
                        tr[str].appendChild(tdValData[str]);
                        tdTypeData[str].innerText = "String";
                        tr[str].appendChild(tdTypeData[str]);
                        break;
                    case "port":
                        tdKeyData[str].innerText = str;
                        tr[str].appendChild(tdKeyData[str]);
                        tdValData[str].innerText = dbInfoSet[str];
                        tr[str].appendChild(tdValData[str]);
                        tdTypeData[str].innerText = "String";
                        tr[str].appendChild(tdTypeData[str]);
                        break;
                    case "db":
                        tdKeyData[str].innerText = str;
                        tr[str].appendChild(tdKeyData[str]);
                        tdValData[str].innerText = dbInfoSet[str];
                        tr[str].appendChild(tdValData[str]);
                        tdTypeData[str].innerText = "String";
                        tr[str].appendChild(tdTypeData[str]);
                        break;
                    case "collections":
                        tdKeyData[str].innerText = str;
                        tr[str].appendChild(tdKeyData[str]);
                        tdValData[str].innerText = dbInfoSet[str];
                        tr[str].appendChild(tdValData[str]);
                        tdTypeData[str].innerText = "Integer";
                        tr[str].appendChild(tdTypeData[str]);
                        break;
                    case "objects":
                        tdKeyData[str].innerText = str;
                        tr[str].appendChild(tdKeyData[str]);
                        tdValData[str].innerText = dbInfoSet[str];
                        tr[str].appendChild(tdValData[str]);
                        tdTypeData[str].innerText = "Integer";
                        tr[str].appendChild(tdTypeData[str]);
                        break;
                    case "avgObjSize":
                        tdKeyData[str].innerText = str;
                        tr[str].appendChild(tdKeyData[str]);
                        tdValData[str].innerText = dbInfoSet[str];
                        tr[str].appendChild(tdValData[str]);
                        tdTypeData[str].innerText = "Double";
                        tr[str].appendChild(tdTypeData[str]);
                        break;
                     case "dataSize":
                        tdKeyData[str].innerText = str;
                        tr[str].appendChild(tdKeyData[str]);
                        tdValData[str].innerText = dbInfoSet[str];
                        tr[str].appendChild(tdValData[str]);
                        tdTypeData[str].innerText = "Double";
                        tr[str].appendChild(tdTypeData[str]);
                        break;
                    case "storageSize":
                        tdKeyData[str].innerText = str;
                        tr[str].appendChild(tdKeyData[str]);
                        tdValData[str].innerText = dbInfoSet[str];
                        tr[str].appendChild(tdValData[str]);
                        tdTypeData[str].innerText = "Double";
                        tr[str].appendChild(tdTypeData[str]);
                        break;
                    case "numExtents":
                        tdKeyData[str].innerText = str;
                        tr[str].appendChild(tdKeyData[str]);
                        tdValData[str].innerText = dbInfoSet[str];
                        tr[str].appendChild(tdValData[str]);
                        tdTypeData[str].innerText = "Integer";
                        tr[str].appendChild(tdTypeData[str]);
                        break;
                    case "indexes":
                        tdKeyData[str].innerText = str;
                        tr[str].appendChild(tdKeyData[str]);
                        tdValData[str].innerText = dbInfoSet[str];
                        tr[str].appendChild(tdValData[str]);
                        tdTypeData[str].innerText = "Integer";
                        tr[str].appendChild(tdTypeData[str]);
                        break;
                    case "indexSize":
                        tdKeyData[str].innerText = str;
                        tr[str].appendChild(tdKeyData[str]);
                        tdValData[str].innerText = dbInfoSet[str];
                        tr[str].appendChild(tdValData[str]);
                        tdTypeData[str].innerText = "Double";
                        tr[str].appendChild(tdTypeData[str]);
                        break;
                    case "fileSize":
                        tdKeyData[str].innerText = str;
                        tr[str].appendChild(tdKeyData[str]);
                        tdValData[str].innerText = dbInfoSet[str];
                        tr[str].appendChild(tdValData[str]);
                        tdTypeData[str].innerText = "Double";
                        tr[str].appendChild(tdTypeData[str]);
                        break;
                    case "nsSizeMB":
                        tdKeyData[str].innerText = str;
                        tr[str].appendChild(tdKeyData[str]);
                        tdValData[str].innerText = dbInfoSet[str];
                        tr[str].appendChild(tdValData[str]);
                        tdTypeData[str].innerText = "Integer";
                        tr[str].appendChild(tdTypeData[str]);
                        break;
                    case "extentFreeList":
                        tdKeyData[str].innerText = str;
                        tr[str].appendChild(tdKeyData[str]);
                        tdValData[str].innerText = JSON.stringify(dbInfoSet[str]);
                        tr[str].appendChild(tdValData[str]);
                        tdTypeData[str].innerText = "BasicDBObject";
                        tr[str].appendChild(tdTypeData[str]);
                        break;
                    case "dataFileVersion":
                        tdKeyData[str].innerText = str;
                        tr[str].appendChild(tdKeyData[str]);
                        tdValData[str].innerText = JSON.stringify(dbInfoSet[str]);
                        tr[str].appendChild(tdValData[str]);
                        tdTypeData[str].innerText = "BasicDBObject";
                        tr[str].appendChild(tdTypeData[str]);
                        break;
                    default:
                        tdKeyData[str].innerText = str;
                        tr[str].appendChild(tdKeyData[str]);
                        tdValData[str].innerText = dbInfoSet[str];
                        tr[str].appendChild(tdValData[str]);
                        tdTypeData[str].innerText = "Double";
                        tr[str].appendChild(tdTypeData[str]);
                }

                tableBody.appendChild(tr[str]);
                table.appendChild(tableBody);
                // table.tBodies[0].appendChild(tr[str]);
            }               
            
        });//end post

  
    }
  
}());





