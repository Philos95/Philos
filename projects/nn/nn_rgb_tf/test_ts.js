/**
 * Get the car data reduced to just the variables we are interested
 * and cleaned of missing data.
 */




 async function getData(){

   
    const colorsDataReq = await fetch('dataFromDB.php?action=takeData&limit=10000');  
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



  async function run() {
    // Load and plot the original input data that we are going to train on.
    //first thing first to do the rest just one time!!!
    

    const data =  await getData();

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
   
       /*  const tensorData = convertToTensor(data);
   
        const {inputs, labels} = tensorData;
   
   
       await trainModel(model, inputs, labels);
       
   
           console.log("training Done!") */
    train(model,xs,ys).then(()=>{
        console.log("training Done")
        let outputs = model.predict(tf.tensor2d([200/255,0/255,0/255],[1,3]));
        outputs.print();
    });
    
  }
  
  document.addEventListener('DOMContentLoaded', run);



  async function train(model,xs,ys){  
      for(var i=0;i<10;i++){
      
            const config={
              epochs:10
            }
        const response = await model.fit(xs,ys,config);
        console.log(response.history.loss[0]);
      }
  }
  


  /**
 * Convert the input data to tensors that we can use for machine 
 * learning. We will also do the important best practices of _shuffling_
 * the data and _normalizing_ the data
 * MPG on the y-axis.
 */
function convertToTensor(data){
    //Wrapping these calculations in a tidy will dispose any intermadiate tensors.
    return tf.tidy(()=>{
        //Step 1, Shuffle the data
        tf.util.shuffle(data);



        //Step 2, Convert data to Tensor
        var inp = data.map(inputData);
        const inputs = inp.flat();

        //tf.tensor2d(inputs,[inp.length,3]).print();

   
        const labels = data.map(colorS=> colorToAnswer(colorS.color));
   

        const inputTensor = tf.tensor2d(inputs,[inp.length,3]);
        const labelTensor = tf.tensor2d(labels,[labels.length,6]);

        //Step 3, Normalize the data to the range 0-1 using min-max scaling
        const inputMax = inputTensor.max();
        const inputMin = inputTensor.min();
        const labelMax = inputTensor.max();
        const labelMin = inputTensor.min();

        const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
        const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

        return{
            inputs: normalizedInputs,
            labels: normalizedLabels,
            //return the min/max bounds so we can use them later.
            inputMax,
            inputMin,
            labelMax,
            labelMin,
        }

    })
}

function inputData(item){
    return [parseFloat(item.R/255),parseFloat(item.G/255),parseFloat(item.B/255)];

}



async function trainModel(model,inputs,labels){
    //Prepare the model for training.
    model.compile({
        optimizer: tf.train.adam(),
        loss: tf.losses.meanSquaredError,
        metrics:['mse'],
    });

    const batchSize = 2;
    const epochs = 2;

    return await model.fit(
        inputs,
        labels,
        {
            batchSize,
            epochs
        }
    );
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