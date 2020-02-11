var Globals=[];

$.ajax({
  async: false,
  type:'POST',
  url: '/philos/application_components/php/getGlobals.php',
  success: function(result){
    var GlobalsJSON=JSON.parse(result);
    Globals=GlobalsJSON[0];
  } 
});



//gestione errore datatable in console javascript
$.fn.dataTable.ext.errMode = 'throw';