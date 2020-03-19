const TOT_DATA=1000;

let W =1080;
let H= 720;

let trainButton;
let sampleButton;
let downloadButton;


let getTheData=false;


let gan = new GAN();



function preload(){
    trainButton= select('#train');
    trainButton.mousePressed(train);
    sampleButton= select('#sample');
    sampleButton.mousePressed(sample);
    sampleButton= select('#download');
    sampleButton.mousePressed(downloadModel);
}



async function setup(){

    var cnv = createCanvas(W,H);
    cnv.parent('sketch-holder');

    console.log("Start Loading");
    await gan.load(TOT_DATA);
    console.log("Get data for Discriminator");
    
    await gan.discriminator.train();
    console.log("Discriminator Trained!");

    await gan.setModel();
    console.log("Gan Model Setted");
    
    background(0);
    noLoop();
}



async function train(num=1000) {

    

    console.log('starting....');
    document.querySelector('#train').disabled = true;
    //trainButton.setAttributes('disabled', true);
    for (let i=0; i < num; i++) {
      document.querySelector('#train').innerHTML = i + '/' + num;
      
      const COSTS = await gan.train();
     
      if (i % 50 === 0 || i === (num-1)) {
        console.log('i', i);
        console.log('discriminator cost', COSTS.dCost);
        console.log('generator cost', COSTS.gCost);
      }
    }
    document.querySelector('#train').innerHTML = 'Train';
    document.querySelector('#train').disabled = false;
    console.log('done...');
}



async function sample() {
    await tf.nextFrame();

    let synthData = gan.generator.generate();

    let count =0;
    while(!isTrue(synthData)){
        synthData = gan.generator.generate();
        
        if(count >= 1000){
            break;
        } else{count++;
        }
        
    }

    if (count>=1000){
        console.log("could not generate a color");
    }else{
        let s_r = parseInt(synthData[0]*255);
        let s_g = parseInt(synthData[1]*255);
        let s_b = parseInt(synthData[2]*255);
        let s_label = valueToLabel(synthData[3],labelList,gan.discriminator.sample);

        let synth_color = new Color(s_label,s_r,s_g,s_b);
        background(0);
        synth_color.show(W/2,H/2,200,200);
        console.log(synthData);
        console.log("R : "+s_r+" G: "+s_g+" B: "+s_b+" Label: "+s_label);

    }

    

    

}

function isTrue(synthData){

    let s_r = parseInt(synthData[0]*255);
    let s_g = parseInt(synthData[1]*255);
    let s_b = parseInt(synthData[2]*255);
    let s_label = valueToLabel(synthData[3],labelList,gan.discriminator.sample);

    let synth_color = new Color(s_label,s_r,s_g,s_b);
    let response = gan.discriminator.discriminate(synth_color,null);

    if (response[0]>response[1]){
    //if (response>0.5){
        return true;
    }else{
        return false;
    }

}


function downloadModel(){
    const saveResult =  gan.model.save('downloads://model');
    console.log(saveResult);
}

function getRandomColorData(){
    let color_name  = labelList[Math.floor(Math.random()*labelList.length)];
    return new Color(color_name, parseInt(random(255)), parseInt(random(255)), parseInt(random(255)));
}
