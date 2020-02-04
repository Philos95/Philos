  const model =loadModel(); 

  
  
  


  async function loadModel(){
      const model= await tf.loadLayersModel('http://51.83.78.82/philos/projects/Tensorflow/third_try/mymodel.json');
      console.log(model);
      return model;
  }
  
  function setup(){
    frameRate(1);
    //train();
  }
  
  
  
  
  
  
  
  async function train(){
    const config={
      shuffle:true,
      epochs:2,
      callbacks:{
        onTrainBegin:(logs)=>{
            console.log("START TRAIN")
        },
        onEpochEnd:(epochs,logs)=>{
            console.log(logs.loss);
        },
        onBatchEnd: async (batch, logs) => {
            await tf.nextFrame();
        },
        onTrainEnd:(logs)=>{
          console.log("Train End");
          //endTrain=true;
          const saveResult =  model.save('downloads://mymodel');
          // This will trigger downloading of two files:
          //   'mymodel.json' and 'mymodel.weights.bin'.
          console.log(saveResult);
        }
      }
    }
    await model.fit(xs,ys,config);
  }
  
  /* const inputs = tf.tensor2d([[0.25,0.92]]);
  
  let outputs = model.predict(inputs);
  outputs.print(); */
  
 /*  function draw(){
    if(endTrain){
      let x,y;
      //console.log("miaomiao");
      if(Math.random()>=0.5){
         x = 1;
      }else{
        x = 0
      }
      if(Math.random()>=0.5){
        y = 1;
     }else{
       y = 0
     }
      let input = tf.tensor2d([[x,y]]);
      //input.print();
      let results = model.predict(input);
      let out;
      if(results.dataSync()>0.5){
        out=1
      }else{
        out=0;
      }
      console.log("x: "+x+" y: "+y+" -> "+out);
    }
  } */