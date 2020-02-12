var W=800;
var H=500;

let img_b,img_y;
let car_b,car_y;

let isRolling=false;
let rolling_time;
let rolling_start;

let d1,d2;
let passengers=[];

let bRoll;

let fr=5;

let chosenPerson = new Person("Chi verrà scelto?");

const d1_name= "CUCCHI";
const d2_name= "MAZZA";

const passengers_list =[
    "LURE",
    "FAVELAS",
    "DESTRO",
    "MINGO",
    "TEME",
    "BADO",
    "MORESCO"
];

function preload() {
  img_b = loadImage('img/b_car.png');
  img_y = loadImage('img/y_car.png');
}


function setup() {
    frameRate(fr);
    var cnv = createCanvas(W, H);
    cnv.parent('sketch-holder');
    
    bRoll = select("#bRoll");
    bRoll.mousePressed(roll);

    //Drivers:
    d1 = new Person(d1_name);
    d2 = new Person(d2_name);


    for (let p of passengers_list) {
        passengers.push(new Person(p));
    }


    //Macchine
    car_b = new Car(img_b,250);
    car_y = new Car(img_y,0);

}


function draw(){
    frameRate(fr);
    background(100);
    car_b.show();
    car_y.show();

    if(isRolling){
        let random = passengers[Math.floor(Math.random()*passengers.length)];
        random.show(600,250);
        if(((Date.now()-rolling_start)/1000)>=rolling_time){
            isRolling=false;
            chosenPerson = random;
        }
        console.log((Date.now()-rolling_start)%500);
        if((Date.now()-rolling_start)%500 >=250 && (Date.now()-rolling_start)%500 <=300){
            
            if(fr >5){
                fr = fr-3;
            }
        }
    }else{
        chosenPerson.show(600,250);
    }
    
    

}


function roll(){
    fr = 30;
    frameRate(fr);
    rolling_start = Date.now();
    rolling_time = getRndInteger(5,8);

    isRolling = true;
    console.log("ROLLING!");
}



function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }