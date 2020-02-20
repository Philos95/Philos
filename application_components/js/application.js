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


//funzione che dice se un valore è compreso tra due
function isBetween(value,min,max){
    if(value>=min && value <=max){
      return true;
    }else{
      return false;
    }
}

//return true if each numerical element of array is between a gap of each other
function inGap(array,gap){
  for(let i of array){
    for(let j of array){
      if(!(Math.abs(i-j)<=gap)){
        return false
      }
    }
  }
  return true;
}