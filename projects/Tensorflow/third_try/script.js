
const inputs=[
  [0,0],
  [0,1],
  [1,0],
  [1,1]
];
const labels=[
  [1],
  [0],
  [0],
  [1]
];
let endTrain=false;


const model = tf.sequential();

const hidden = tf.layers.dense({
  inputShape:[2],
  units:4,
  activation:"sigmoid"
})
model.add(hidden);

const output = tf.layers.dense({
  units:1,
  activation:"sigmoid"
})
model.add(output);


const sgdOpt = tf.train.sgd(0.25);

model.compile({
  optimizer: sgdOpt,
  loss: tf.losses.meanSquaredError
});

let data_input=[];
let data_output=[];

for (var i=0; i<10000;i++){
  var index = Math.floor(Math.random()*inputs.length);
  data_input.push(inputs[index]);
  data_output.push(labels[index]);
}
/* console.log(data_input);
console.log(data_output); */

const xs = tf.tensor2d(data_input);
//console.log(xs_);
xs.print();

const ys = tf.tensor2d(data_output);
//console.log(ys_)
ys.print();

/* const xs = tf.tensor2d(inputs)
xs.print();

const ys = tf.tensor2d(labels)
ys.print(); */


function setup(){
  frameRate(1);
  train();
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
        endTrain=true;
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

function draw(){
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
}