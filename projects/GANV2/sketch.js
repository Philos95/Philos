const TOT_DATA=100;

let W =1080;
let H= 720;


let getTheData=false;


let gan = new GAN();


let result;


async function setup(){

    var cnv = createCanvas(W,H);
    cnv.parent('sketch-holder');

    await gan.data.load();
    console.log("Get data for Discriminator");



   
}

function draw(){
    background(0);

}





function getRandomColorData(){
    let color_name  = labelList[Math.floor(Math.random()*labelList.length)];
    return new Color(color_name, parseInt(random(255)), parseInt(random(255)), parseInt(random(255)));
}
