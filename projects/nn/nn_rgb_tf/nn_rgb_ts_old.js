const TOT_DATA = 100;
let R;
let G;
let B;

let FrameSlider;
let frameSpan;

let trainComplete = false;
let startGame = false;

let Lose =0;
let Win = 0;
let trained=0;

let W =750;
let H= 500;

let data;




async function setup(){

    var cnv = createCanvas(W+220,H);
    cnv.parent('sketch-holder');

    FrameSlider = select('#frameSlider');
    frameSpan = select('#frame');

    data =  await getData();

}


function draw(){
    background(0);
    
    if (startGame){
        frameRate(FrameSlider.value());
        frameSpan.html(FrameSlider.value())
        pickColor();
        background(150);

        fill(R,G,B);
        rect(W+50, (H/4)-30, 100, 100, 20 )

        printBack();

        let predictC = predictColor()

        printColor(predictC,255,80);
    
        let rightC = rightColor(R,G,B)
      
        printColor(rightC,0,20);


        if(predictC == rightC){
            Win++;
        }else{
            Lose++
        }
    

    }else{
        if(!trainComplete){
            console.log("cisipassa");
            background(0);
            trainAI();
           

        }else{
            background(0);
            textSize(32);
            textAlign(CENTER, CENTER);
            fill(255);
            text('Training Done!', width/2, (height/2) -50);
            text('Click to Start Game', width/2, height/2);
        }
    }



}

async function getData(){
   
    const colorsDataReq = await fetch('dataFromDB.php?action=takeData&limit='+TOT_DATA);  
    const colorsData = await colorsDataReq.json();  
    const cleaned = colorsData.map(colorS => ({
        R: colorS.R,
        G: colorS.G,
        B: colorS.B,
        color:colorS.color,
    }))
    .filter(colorS => (colorS.R != null && colorS.G != null && colorS.B != null && colorS.color != null));
    
    return cleaned;
   
}




 async function trainAI(){

    //first thing first to do the rest just one time!!!
    trainComplete = true;
 
    

   //Create sequential Model
   const model = tf.sequential();

    //Add a single hidden layer
    model.add(tf.layers.dense({inputShape: [3], units: 7 ,activation: 'sigmoid'}));

    //Add output layer
    model.add(tf.layers.dense({units: 6, activation: 'sigmoid'}));

    const sgdOpt = tf.train.sgd(0.5);

    model.compile({
        optimizer: sgdOpt,
        loss: tf.losses.meanSquaredError
    })


    tf.util.shuffle(data);
    
    
    var inp = data.map(inputData);
    const inputs = inp.flat();

    const xs = tf.tensor2d(inputs,[inp.length,3]);
    console.log(xs);
    
    
    const labels = data.map(colorS=> colorToAnswer(colorS.color));
    const ys = tf.tensor2d(labels,[labels.length,6]);
    console.log(ys);


    train(model,xs,ys).then(()=>{
        console.log("training Done")
        let outputs = model.predict(tf.tensor2d([200/255,0/255,0/255],[1,3]));
        outputs.print();
    });
    

        console.log("training Done!")

   

}


async function train(model,xs,ys){  
    for(var i=0;i<10;i++){
    
          const config={
            epochs:10
          }
      const response = await model.fit(xs,ys,config);
      console.log(response.history.loss[0]);
    }
}





function predictColor(){
    

    let colorArray = model.predict(tf.tensor2d([R/255,G/255,B/255],[1,3]));

    let colorPredicted = 0;
 
    for(let i =1; i<colorArray.length;i++){
        if(colorArray[i]>colorArray[colorPredicted]){
            colorPredicted = i;
        }
    }
    switch (colorPredicted){
         case 0:
             return"blue";
         case 1:
             return"green";
         case 2:
             return"red";
         case 3:
             return"yellow";
         case 4:
             return"magenta"; 
         case 5:
             return"cyan";  
    }
 }





function colorToAnswer(color){
    let answer;
    switch(color){
        case "blue":
            answer=[1,0,0,0,0,0];
        break;
        case "green":
            answer=[0,1,0,0,0,0];
        break;
        case "red":
            answer=[0,0,1,0,0,0];
        break;
        case "yellow":
            answer=[0,0,0,1,0,0];
        break;
        case "magenta":
            answer=[0,0,0,0,1,0];
        break;
        case "cyan":
            answer=[0,0,0,0,0,1];
        break;
    }

    return answer;
}

function pickColor(){
    R = random(255);
    G = random(255);
    B = random(255); 
    
}



function mouseClicked(){
    if((mouseX>0 &&mouseX<width) && (mouseY>0 &&mouseY<height)){
        if(trainComplete){
            startGame = !startGame;
        }
    }
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






function inputData(item){
    return [parseInt(item.R),parseInt(item.G),parseInt(item.B)];

}

