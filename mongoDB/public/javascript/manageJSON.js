(function() {

  manageJson = function(input_value) {
    $.each(input_value, function(key, value){
            var isObject = typeof(value);
            if(isObject == 'object'){
                manageJson(value);
            }else{
                 alert(key +"__"+ value);
            }
        });
  }
}());