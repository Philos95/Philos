let W =750;
let H= 500;

let r,g,b;


function setup(){
    var cnv = createCanvas(W+220,H);
    cnv.parent('sketch-holder');
    frameRate(1);


}

function draw(){
    pickColor();
    background(150);
    

    let distance = Infinity;
    let nearestColor;
    for(let color of colorArray){
        if(color.getDistance(r,g,b)<distance){
            distance = color.getDistance(r,g,b);
            nearestColor=color;
        }
    }
  
    printBack(nearestColor.name,"miao");

}




function pickColor(){
    r = parseInt(random(255));
    g = parseInt(random(255));
    b = parseInt(random(255)); 
}





function printBack(rightColor,colorGuessed){
    
    fill(r,g,b);
    rect((width/2)-100, (height/2)-100, 100, 100, 20 )


    textSize(32);
    //textAlign(CENTER, CENTER);
    fill(rightColor);
    text(rightColor, (width/2)-300, height/2);

}