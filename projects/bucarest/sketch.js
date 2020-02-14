var W=1000;
var H=720;

let img_b,img_y;
let car_b,car_y;

let isRolling=false;
let rolling_time;
let rolling_start;

let d1,d2;
let passengers=[];

let bRoll;

let fr=5;

let chosenPerson;

const d1_name= "img/cukky.jpg";
const d2_name= "img/mazza.jpg";

const  passengers_list =[
    "img/lure.jpg",
    "img/FavelaS.jpg",
    "img/Destro.jpg",
    "img/Mingo.jpg",
    "img/Teme.jpg",
    "img/Bado.jpg",
    "img/Moresco.jpg",
];
let passengers_list_img=[];

function preload() {
  img_b = loadImage('img/b_car.png');
  img_y = loadImage('img/y_car.png');
  chosenPerson = new Person(loadImage('img/who.jpg'));
  //Drivers:
  d1 = new Person(loadImage(d1_name));
  d2 = new Person(loadImage(d2_name));

  
  for (let p of passengers_list) {
    //console.log(passengers_list);
    passengers_list_img.push(loadImage(p));
}
 
}


function setup() {
    frameRate(fr);
    var cnv = createCanvas(W, H);
    cnv.parent('sketch-holder');
    
    bRoll = select("#bRoll");
    bRoll.mousePressed(roll);

    

    for (let p of passengers_list_img) {
        //console.log(passengers_list_img);
        passengers.push(new Person(p));
    }


    //Macchine
    car_b = new Car(img_b,380,40,d1,4);
    car_y = new Car(img_y,0,40,d2,3);

}


function draw(){
    frameRate(fr);
    background(100);
    car_b.show();
    car_y.show();
    checkRolling();
}

function mouseClicked() {
    let b_click = car_b.isClicked(mouseX,mouseY);
    if (b_click){
        console.log(b_click);
    }
    let y_click = car_y.isClicked(mouseX,mouseY);
    if (y_click){
        console.log(y_click);
    }
}




function roll(){
    fr = 30;
    frameRate(fr);
    rolling_start = Date.now();
    rolling_time = getRndInteger(5000,8000);

    isRolling = true;
    console.log("ROLLING!");
}



function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


function checkRolling(){

    if(isRolling){
        let random = passengers[Math.floor(Math.random()*passengers.length)];
        random.show(750,200);
        if(((Date.now()-rolling_start))>=rolling_time){
            isRolling=false;
            chosenPerson = random;
        }
        //console.log((Date.now()-rolling_start)%1000);
        if((Date.now()-rolling_start)%500 >=250 && (Date.now()-rolling_start)%500 <=300){
            
            if(fr >5){
                fr = fr-3;
            }
        }
    }else{
        chosenPerson.show(750,200);
        fr=30;
    }

}