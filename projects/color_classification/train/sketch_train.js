let dataInput; 
let trainInput; 
let epochsInput; 
let lrInput;

let TOT_DATA;
let TRAIN_TIMES;
let NUM_EPOCHS;
let LR;


let getTheData = false;
let trainComplete = false;
let startGame = false;

let Lose =0;
let Win = 0;
let trained=0;
let trainPerc=0;

let r,g,b;
let xs,ys;

let W =750;
let H= 500;

let timeLeft=0;
let hLeft=0,mLeft=0,sLeft=0;

let startTime =0;
let timeTot=0;
let hTot=0,mTot=0,sTot=0;



let data;

let model;

let actualLoss=0;
let loss= new Array();

let FrameSlider;
let frameSpan;
let buttonDownload;

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

        
    dataInput =  select("#dataInput");
    trainInput =  select("#trainInput");
    epochsInput =  select("#epochsInput");
    lrInput =  select("#lrInput");


    TOT_DATA = parseInt(dataInput.value());
    TRAIN_TIMES = parseInt(trainInput.value());
    NUM_EPOCHS = parseInt(epochsInput.value());
    LR = parseFloat(lrInput.value());

    buttonDownload = select("#downloadModel");
    buttonDownload.mousePressed(downloadModel);

    FrameSlider = select('#frameSlider');
    frameSpan = select('#frame');

    data = await getData();
    console.log("Get Data!");
    getTheData = true;

    
    model = await setModel();
    console.log("Set Model!");
    

    tf.util.shuffle(data);
    

    let colors = [];
    let labels = [];
    for (let record of data) {
      let col = [parseFloat(record.R / 255), parseFloat(record.G / 255), parseFloat(record.B / 255)];
      colors.push(col);
      labels.push(labelList.indexOf(record.color));  
    }


    xs = tf.tensor2d(colors);

    let labelsTensor = tf.tensor1d(labels, 'int32');
    ys = tf.oneHot(labelsTensor, 12).cast('float32');
    labelsTensor.dispose();

    xs.print();
    ys.print();


    model = await setModel();


    train(model,xs,ys).then(()=>{
        console.log("training Done")

        trainComplete= true;
        timeTot = Math.floor((Date.now() - startTime)/1000);

        hTot =  Math.floor(timeTot / 3600);
        let temp =  timeTot % 3600;
        mTot =  Math.floor(temp / 60);
        temp = temp %60;
        sTot =  Math.floor(temp);

        buttonDownload.removeAttribute('disabled');
    });

}




async function draw(){
    if(!getTheData){
        background(0);
        textSize(32);
        textAlign(CENTER, CENTER);
        fill(255);
        text('Getting the Data from DB', width/2, (height/2) -50);
        text('Just Wait...', width/2, height/2);
    }else{
        //Get The Data
        if(!trainComplete){
            background(0);
            textSize(32);
            textAlign(CENTER, CENTER);
            fill(255);
            text('Training the AI', width/2, (height/2) -50);
            text('Training at: '+trainPerc+'%', width/2, height/2);
            text('LOSS: '+actualLoss, width/2, (height/2)+50);
            text('Time Left: '+hLeft+'h '+mLeft+'m '+sLeft+'s', width/2, (height/2)+100);

            textSize(16);
            text('Tot. Data: '+TOT_DATA*12, (width/2)-100 , (height/2) +150);
            text('Trained: '+TRAIN_TIMES,( width/2), (height/2)+150);
            text('Epochs: '+NUM_EPOCHS, (width/2)+100, (height/2)+150);
        }else{
            //Train Complete
            if(!startGame){
                background(0);
                textSize(32);
                textAlign(CENTER, CENTER);
                fill(255);
                text('Training Complete!', width/2, (height/2) -50);
                text('Click to start the game! ', width/2, height/2);
                text('LOSS: '+actualLoss, width/2, (height/2)+50);
                text('Tot Time: '+hTot+'h '+mTot+'m '+sTot+'s', width/2, (height/2)+100);

                textSize(16);
                text('Tot. Data: '+TOT_DATA*12, (width/2)-100 , (height/2)+150);
                text('Train: '+TRAIN_TIMES ,( width/2), (height/2)+150);
                text('Epochs: '+NUM_EPOCHS, (width/2)+100, (height/2)+150);
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
        if(trainComplete){
            startGame = !startGame;
        }
    }
}


function downloadModel(){
    const saveResult =  model.save('downloads://model');
    console.log(saveResult);
 }