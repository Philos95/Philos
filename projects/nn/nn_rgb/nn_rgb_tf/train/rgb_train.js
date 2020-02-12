
//GET Data
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

//SET Model
async function setModel(){
    let model = tf.sequential();

    //Add a single hidden layer
    model.add(tf.layers.dense({
        inputShape: [3], 
        units: 7,
        activation: 'sigmoid'
    }));

    //Add hidden layer
    //model.add(tf.layers.dense({units: 8, activation: 'sigmoid'}));

    //Add output layer
    model.add(tf.layers.dense({
        units: 6, 
        activation: 'softmax'
    }));

    const sgdOpt = tf.train.sgd(0.25);

    model.compile({
        optimizer: sgdOpt,
        //loss:'meanSquaredError',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
    })

    return model;
}


//Train AI
async function train(model,xs,ys){  

    const percentChange = 1/ TRAIN_TIMES / NUM_EPOCHS;
    let percentage = 0;
    let startEpochTime=0;
    startTime = Date.now();
    for(var i=1;i<TRAIN_TIMES+1;i++){
    
        const config={
            shuffle:true,
            epochs:NUM_EPOCHS,
            validationSplit:0.1,
            callbacks:{
                onEpochBegin:(epochs,logs)=>{
                   startEpochTime = Date.now();
        
                },
                onEpochEnd:(epochs,logs)=>{
                    percentage += percentChange;
                    trainPerc = parseFloat(percentage*100).toFixed(2);
                    
                    let leftPerc = 100-trainPerc;
                    
                    let millis = Date.now() - startEpochTime;

                    let LPperSec = parseFloat(leftPerc*millis).toFixed(2);
                    timeLeft = (LPperSec/1000)/(100/(TRAIN_TIMES*NUM_EPOCHS));


                    hLeft =  Math.floor(timeLeft / 3600);
                    let remainder =  timeLeft % 3600;
                    mLeft =  Math.floor(remainder / 60);
                    remainder = remainder %60;
                    sLeft =  Math.floor(remainder);
                    
                    actualLoss = logs.loss.toFixed(5);
                    
                },
                onBatchEnd: async (batch, logs) => {
                    await tf.nextFrame();
                }
            }
        }
        await model.fit(xs,ys,config);
       /*  trainPerc = i*100/TRAIN_TIMES;
        actualLoss = response.history.loss[0];
        console.log(response.history.loss); */
    }
}



function predictColor(r,g,b){
    
    let input = tf.tensor2d([[parseFloat(r/255),parseFloat(g/255),parseFloat(b/255)]]);
    //input.print();
    let results = model.predict(input);
   
    let argMax = results.argMax(1);
    let index = argMax.dataSync()[0];
    let label = labelList[index];

    return label;
    /* //tensor.print();

    let values = tensor.dataSync();
    let colorArray = Array.from(values);

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
    } */
 }

