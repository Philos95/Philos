const TOT_DATA = 1000;
const TRAIN_TIMES = 10;
const NUM_EPOCHS = 40;

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

let startTime=0;
let timeLeft=0;


let data;

let model;

let actualLoss=0;
let loss= new Array();


let labelList = [
    "blue",
    "green",
    "red",
    "yellow",
    "magenta", 
    "cyan"  
]




async function setup(){

    var cnv = createCanvas(W+220,H);
    cnv.parent('sketch-holder');

    FrameSlider = select('#frameSlider');
    frameSpan = select('#frame');

    data = await getData();
    console.log("Get Data!");
    getTheData = true;

    
    model = await setModel();
    console.log("Set Model!");
    

    tf.util.shuffle(data);
    
    /* var inp = data.map(inputData);
    const inputs = inp.flat(); */
    //const normalizedInputs = inputs
   // console.log(inputs);


    let colors = [];
    let labels = [];
    for (let record of data) {
      let col = [parseFloat(record.R / 255), parseFloat(record.G / 255), parseFloat(record.B / 255)];
      colors.push(col);
      labels.push(labelList.indexOf(record.color));  
    }

    //console.log(colors);
    //console.log(lab);


    xs = tf.tensor2d(colors);

    let labelsTensor = tf.tensor1d(labels, 'int32');
    ys = tf.oneHot(labelsTensor, 6).cast('float32');
    labelsTensor.dispose();

    xs.print();
    ys.print();


    model = await setModel();


    train(model,xs,ys).then(()=>{
        console.log("training Done")

        trainComplete= true;
      
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
           // text('TimeLeft: '+timeLeft+'s', width/2, (height/2)+100);
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
                   
                    printColor(predictC,255,80);
                
                    let rightC = rightColor(r,g,b)
                
                    printColor(rightC,0,20);


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
    line(0,H/2,W,H/2);
    
    line(W/3,0,W/3,H);

    line(W*2/3,0,W*2/3,H);
    line(W,0,W,H);


    fill(0)
    textAlign(CENTER, CENTER);
    textSize(40);
    text('Blue', W/6, 40);
    text('Green', W/2, 40);
    text('Red', W*5/6, 40);


    text('Yellow', W/6, (H/2)+40);
    text('Magenta', W/2, (H/2) +40);
    text('Cyan', W*5/6, (H/2)+ 40);
    

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


function printColor(color,type,y_off){
    let x;
    let y;
    switch(color){
        //1°
        case "blue":
            x= W/6;
            y = H/4;
        break;
        //2
        case "green":
            x= W/2;
            y = H/4;
        break;
        //3
        case "red":
            x= W*5/6;
            y = H/4;
        break;
        //4
        case "yellow":
            x= W/6;
            y = H*3/4;
        break;
        //5
        case "magenta":
            x= W/2;
            y = H*3/4;
        break;
        //6
        case "cyan":
            x= W*5/6;
            y = H*3/4;
        break;
    }
    fill(type);
    ellipse(x,y+y_off,40,40);
}



function rightColor(r,g,b){
    let actualColor = rightRGB(r,g,b);
    let limit =300;
   
    if((g+b)-r > limit){
        actualColor = "cyan";
    }else if((r+g)-b>limit){
        actualColor =  "yellow";
    }else if((r+b)-g>limit){
        actualColor =  "magenta";

    }
    return actualColor;
}

function rightRGB(r,g,b){
    let colorArray=[];

    colorArray[0]=(r);
    colorArray[1]=(g);
    colorArray[2]=(b);
    let pColor =max(colorArray);
    

    switch(pColor){
         case colorArray[0]:
            return "red";
         case colorArray[1]:
            return "green";
         case colorArray[2]:
            return "blue";
    }
}




function pickColor(){
    var item = data[Math.floor(Math.random()*data.length)];
   r = parseInt(item.R);
   g = parseInt(item.G);
   b = parseInt(item.B);
   
}



function mouseClicked(){
    if((mouseX>0 &&mouseX<width) && (mouseY>0 &&mouseY<height)){
        if(trainComplete){
            startGame = !startGame;
        }
    }
}