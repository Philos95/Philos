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




function arrayTotoLabel(array){
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