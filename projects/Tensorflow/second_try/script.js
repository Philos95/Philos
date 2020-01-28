const model = tf.sequential();

const hidden = tf.layers.dense({
  inputShape:[2],
  units:4,
  activation:"sigmoid"
})
model.add(hidden);

const output = tf.layers.dense({
  units:3,
  activation:"sigmoid"
})
model.add(output);


const sgdOpt = tf.train.sgd(0.1);

model.compile({
  optimizer: sgdOpt,
  loss: tf.losses.meanSquaredError
})

const xs = tf.tensor2d([
  [0.25,0.92],
  [0.12,0.3],
  [0.46,0.32],
  [0.23,0.54],
  [0.74,0.2]
])
console.log(xs);

const ys = tf.tensor2d([
  [0.6,0.45,0.32],
  [0.23,0.43,0.76],
  [0.1,0.4545,0.65],
  [0.16,0.3,0.3542],
  [0.78,0.45,0.9832]
])
console.log(ys)
/* const config={
  epochs:100
} */


train();
async function train(){
  for(let i=0;i<10;i++){
    const config={
      epochs:10
    }
    const response = await model.fit(xs,ys,config);
    console.log(response.history.loss[0]);
  }
}

/* const inputs = tf.tensor2d([[0.25,0.92]]);

let outputs = model.predict(inputs);
outputs.print(); */