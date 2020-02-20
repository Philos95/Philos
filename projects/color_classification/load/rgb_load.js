//SET Model
async function getModel(){
    const model= await tf.loadLayersModel('http://51.83.78.82/philos/projects/nn/nn_rgb/nn_rgb_tf/model/model.json');
    loadedModel = true;
    return model;
}





function predictColor(r,g,b){
    
    let input = tf.tensor2d([[parseFloat(r/255),parseFloat(g/255),parseFloat(b/255)]]);
    //input.print();
    let results = model.predict(input);
   
    let argMax = results.argMax(1);
    let index = argMax.dataSync()[0];
    let label = labelList[index];

    return label;
   
 }
