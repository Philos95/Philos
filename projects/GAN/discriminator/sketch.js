const TOT_DATA=1000;

let W =1000;
let H= 500;



let result;

let startGame=false;
let isReal=true;

let data=[];

let discriminator = new Discriminator();



async function setup(){
    var cnv = createCanvas(W,H);
    cnv.parent('sketch-holder');


    frameRate(1);

     await discriminator.setData(TOT_DATA);
    console.log("Set Discriminator Data");
    startGame = true;


   await discriminator.train().then(()=>{
        console.log("training Done")

    });  


}



async function draw(){
   background(0);
 

}





function getRandomColorData(){
    let color_name  = labelList[Math.floor(Math.random()*labelList.length)];
    return new Color(color_name, parseInt(random(255)), parseInt(random(255)), parseInt(random(255)));
}


