const TOT_DATA = 1500;

let W =1000;
let H= 500;

const data = new Data(TOT_DATA);


let loadButton,insertButton;

async function start() {
    await loadData();
}
function preload(){
    loadButton= select('#load');
    loadButton.mousePressed(loadModel);
    insertButton= select('#insert');
    insertButton.mousePressed(insertData);
}


async function setup(){
    var cnv = createCanvas(W,H);
    cnv.parent('sketch-holder');

   
    await start();


    background(0);

    noLoop();


}




async function loadData() {
    console.log('Start loading...');
    document.querySelectorAll('button').forEach( d => d.disabled = true);
    await data.load();
    console.log('Done loading...');
    document.querySelectorAll('button').forEach(d => d.disabled = false);
   // document.querySelector('#load-status').style.display = 'none';
}



function loadModel(){
    console.log("miao");

}

function insertData(){

}