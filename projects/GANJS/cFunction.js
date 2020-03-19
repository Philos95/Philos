function labelToArray(label){
    for(let color of labelList){
        if(color==label){
            index= labelList.indexOf(color);
        }
    }

    let array=[];
    for(let i=0;i<12;i++){
        if (i==index){
            array.push(1);
        }else{
            array.push(0);
        }
    }

    return array;

}


function arrayTotLabel(array){
    if(Array.isArray(array)){
        let colorPredicted = 0;

        for(let i =1; i<array.length;i++){
            if(array[i]>array[colorPredicted]){
                colorPredicted = i;
            }
        }
        return labelList[colorPredicted];
   
    }
}


//Funzione che dato un valore restituisce la label associata
function valueToLabel(value,labelList,sample){

    let labelListVal= getSortedListOfVal(labelList,sample);
    let betWeenVal =[];
   
    for(let i=labelListVal.length-1;i>=0;i--){
        let sum=0;
        for(let j=i;j>=0;j--){
            if(j!=i){
                sum=sum+labelListVal[j].val;
            }
        }
        betWeenVal.push({
            label:labelListVal[i].label,
            min:sum/sample.length,
            max:(sum+labelListVal[i].val)/sample.length
        })
    }

    for(let range of betWeenVal){
        if(isBetween(value,range.min,range.max)){
            return range.label;
        }
    }
    return "none";

}



//Funzione che dato una label restituisce il valore associato
function labelToValue(label,labelList,sample){

    let labelListVal=getSortedListOfVal(labelList,sample);
   

    let index = getIndexOfLabel(labelListVal,label);

    let tot = 0;
    for(let i =index; i>=0; i--){
        
        if(i==index){
            tot = tot+(labelListVal[i].val/sample.length);
        }else{
            tot = tot+ ((labelListVal[i].val/sample.length)*2);
        }
     
    }

    return tot/2;
}



function getSortedListOfVal(labelList,sample){

    let labelListVal=[];
    for(let l of labelList){
        labelListVal.push({
            label:l,
            val:countVal(l,sample)
        });
    }


    // ordinamento per valore
    labelListVal.sort(function (a, b) {
        return a.val - b.val;
    });


    return labelListVal;

}

function countVal(label,sample){
    let count=0;
    for(let l of sample){
        if(label==l.color){
            count++;
        };
    }

    return count;
}


function getIndexOfLabel(array,label){
    let index =0;
    for(let item of array){
        if (item.label == label){
            index = array.indexOf(item);
        }
    }

    return index;
}


function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}