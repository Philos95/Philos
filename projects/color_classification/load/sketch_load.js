
let loadedModel = false;
let startGame = false;

let Lose =0;
let Win = 0;
let trained=0;
let trainPerc=0;

let r,g,b;
let xs,ys;

let W =750;
let H= 500;

let startTime=0;
let timeLeft=0;


let data;

let model;

let actualLoss=0;
let loss= new Array();

let FrameSlider;
let frameSpan;


let labelList = [
    "red",
    "green",
    "blue",
    "yellow",
    "pink", 
    "azure",
    "orange",
    "purple",
    "brown",
    "grey",
    "black",
    "white"  
];



async function setup(){

    var cnv = createCanvas(W+220,H);
    cnv.parent('sketch-holder');


    FrameSlider = select('#frameSlider');
    frameSpan = select('#frame');

    model = await getModel();
    console.log("Model Loaded!");
    console.log(model);
    

}




async function draw(){
   
    //load The Model
    if(!loadedModel){
        background(0);
        textSize(32);
        textAlign(CENTER, CENTER);
        fill(255);
        text('Loading The model', width/2, (height/2) -50);
        text('Please Wait... ', width/2, height/2);
    }else{
        //Train Complete
        if(!startGame){
            background(0);
            textSize(32);
            textAlign(CENTER, CENTER);
            fill(255);
            text('Model Loaded!', width/2, (height/2) -50);
            text('Click to start the game! ', width/2, height/2);
            //text('LOSS: '+actualLoss, width/2, (height/2)+50);
        }else{
            //Start the game
            tf.tidy(() => {
                frameRate(FrameSlider.value());
                frameSpan.html(FrameSlider.value())
                pickColor();
                background(150);


                fill(r,g,b);
                rect(W+50, (H/4)-30, 100, 100, 20 )

                printBack();

                let predictC = predictColor(r,g,b)
                
                printColor(predictC,255,H/12,W,H);
            
                let rightC = rightColor(r,g,b)
            
                printColor(rightC,0,0,W,H);


                if(predictC == rightC){
                    Win++;
                }else{
                    Lose++
                } 
            })
        }
    }

}


function printBack(){
    stroke(0);
    strokeWeight(4);


    line(0,H/3,W,H/3);
    line(0,(H*2)/3,W,(H*2)/3);

    line(W/4,0,W/4,H);
    line(W/2,0,W/2,H);
    line((W*3)/4,0,(W*3)/4,H);
    line(W,0,W,H);
   
    strokeWeight(2);
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(0);


    let l=50;
    let i = 0;
    for(let w=0;w<=3;w++){
        for(let h=0;h<=2;h++){
            
            let wid =((W*((w*2)+1))/8); 
            let hei = (H*((h*4)+1))/12;
            text(labelList[i], wid, hei);
            i++;
        }
    }
    

    textAlign(CENTER, CENTER);
    fill(0);
    textSize(12);
    strokeWeight(1);
    textFont('Georgia');
    textStyle(NORMAL);

   
    text('Trained: '+trained+" Times",width*7/8, (height/2));

    text('Win: '+Win , width*7/8, (height/2)+20);
    text('Lose: '+Lose,width*7/8, (height/2)+40);
    let perc = (Win/(Win+Lose))*100;
    text('Perc: '+perc+"%",width*7/8, (height/2)+60);
   

}


function pickColor(){
    r = parseInt(random(255));
    g = parseInt(random(255));
    b = parseInt(random(255));  
}



function mouseClicked(){
    if((mouseX>0 &&mouseX<width) && (mouseY>0 &&mouseY<height)){
        if(loadedModel){
            startGame = !startGame;
        }
    }
}