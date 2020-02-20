const TOT_DATA=10;

let W =750;
let H= 500;


let data;
let getTheData=false;

let model;



let result;

let labelList = [
    "red",
    "green",
    "blue",
    "yellow",
    "magenta", 
    "cyan"  
];


async function setup(){

    var cnv = createCanvas(W+220,H);
    cnv.parent('sketch-holder');

    data = await getData();
    console.log("Get Data!");
    getTheData = true;


    model = await setModel();
    console.log("Set Model!");

    tf.util.shuffle(data);


    let colors = [];
    let labels = [];
    for (let record of data) {
      let col = [parseFloat(record.R / 255), parseFloat(record.G / 255), parseFloat(record.B / 255), labelToArray(record.color)];
      //col.flat(); 
      colors.push(col.flat());
      labels.push(labelList.indexOf(record.color));  
    }


    xs = tf.tensor2d(colors);





    result = discriminate(189,250,0,[1,0,0,0,0,0]);

    console.log(result);


}

function draw(){
    background(0);

}


function labelToArray(label){
    switch(label){
        case "red":
            return [1,0,0,0,0,0];
        break;
        case "green":
            return [0,1,0,0,0,0];
        break;
        case "blue":
            return [0,0,1,0,0,0];
        break;
        case "yellow":
            return [0,0,0,1,0,0];
        break;
        case "magenta":
            return [0,0,0,0,1,0];
        break;
        case "cyan":
            return [0,0,0,0,0,1];
        break;
    }
}




function arrayTotoLabel(array){
    if(Array.isArray(array)){
    let colorPredicted = 0;

   for(let i =1; i<array.length;i++){
       if(array[i]>array[colorPredicted]){
           colorPredicted = i;
       }
   }
   switch (colorPredicted){
        case 0:
            return"red";
        case 1:
            return"green";
        case 2:
            return"blue";
        case 3:
            return"yellow";
        case 4:
            return"magenta"; 
        case 5:
            return"cyan";  
   }
    }
}