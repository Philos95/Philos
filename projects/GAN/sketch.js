const TOT_DATA=10;

let W =750;
let H= 500;


let data;
let getTheData=false;

let model;



let result;


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





function getRandomColorData(){
    let color_name  = labelList[Math.floor(Math.random()*labelList.length)];
    return new Color(color_name, parseInt(random(255)), parseInt(random(255)), parseInt(random(255)));
}
