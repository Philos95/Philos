let training_data=[
    {
        inputs:[0,0],
        outputs:[0],
    },
    {
        inputs:[0,1],
        outputs:[1],
    },
    {
        inputs:[1,0],
        outputs:[1],
    },
    {
        inputs:[1,1],
        outputs:[0],
    }
];

let nn;

function setup(){

    var cnv = createCanvas(600,600);
    cnv.parent('sketch-holder');

    nn = new NeuralNetwork(2,4,1);

    lr_slider = createSlider(0, 0.5, 0.1, 0.01);
    
    
    
}

function draw(){
    background(0);

    
    for(let i=0; i<1000;i++){
        let data = random(training_data);
        nn.train(data.inputs,data.outputs);     
    }

    nn.setLearningRate(lr_slider.value());

    let res =10;
    let cols = width/res;
    let rows= height/res;

    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            let x1 = i/cols;
            let x2 = j/cols;
            let inputs = [x1,x2];
            let y = nn.predict(inputs);

            fill(y*255);
            noStroke();
            rect(i*res,j*res,res,res);
        
        }
    }

   


}

