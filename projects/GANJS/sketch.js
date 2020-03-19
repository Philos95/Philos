const TOT_DATA = 1500;

const NUM_DATASET_ELEMENTS = TOT_DATA*12;


const NUM_TRAIN_ELEMENTS = parseInt( NUM_DATASET_ELEMENTS*90/100);
const NUM_TEST_ELEMENTS = NUM_DATASET_ELEMENTS - NUM_TRAIN_ELEMENTS;

let W =1000;
let H= 500;



let result;

let startGame=false;
let isReal=true;

let trainButton;
let sampleButton;
let downloadButton;

const data = new Data(TOT_DATA);


async function start() {
    await loadData();
}
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

   
    await start();


    background(0);

    noLoop();


}





async function train(num=1375) {
    console.log('starting....');
    document.querySelector('#train').disabled = true;
    //trainButton.setAttributes('disabled', true);
    for (let i=0; i < num; i++) {
      document.querySelector('#train').innerHTML = i + '/' + num;
      const real = data.nextTrainBatch(BATCH);
      const fake = seed();
    
      const [dcost, gcost] = await trainBatch(real.xs, fake);
      if (i % 50 === 0 || i === (num-1)) {
        console.log('i', i);
        console.log('discriminator cost', dcost.dataSync());
        console.log('generator cost', gcost.dataSync());
      }
    }
    document.querySelector('#train').innerHTML = 'Train';
    document.querySelector('#train').disabled = false;
    console.log('done...');
}


async function loadData() {
    console.log('Start loading...');
    document.querySelectorAll('button').forEach( d => d.disabled = true);
    await data.load();
    console.log('Done loading...');
    document.querySelectorAll('button').forEach(d => d.disabled = false);
   // document.querySelector('#load-status').style.display = 'none';
}



async function sample() {
    await tf.nextFrame();

    const synthData = gen(seed(1)).dataSync();
    let s_r = parseInt(synthData[0]*255);
    let s_g = parseInt(synthData[1]*255);
    let s_b = parseInt(synthData[2]*255);
    let s_label = valueToLabel(synthData[3],labelList,data.sample);

    let synth_color = new Color(s_label,s_r,s_g,s_b);
    background(0);
    synth_color.show(W/2,H/2,200,200);
    console.log(synthData);
    console.log("R : "+s_r+" G: "+s_g+" B: "+s_b+" Label: "+s_label);

    

}


function downloadModel(){
    const saveResult =  data.model.save('downloads://model');
    console.log(saveResult);
}

function getRandomColorData(){
    let color_name  = labelList[Math.floor(Math.random()*labelList.length)];
    return new Color(color_name, parseInt(random(255)), parseInt(random(255)), parseInt(random(255)));
}


