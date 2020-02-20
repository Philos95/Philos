let W =750;
let H= 500;

let r,g,b;

const colorArray =[
    new Color("aqua",0,255,255),
    new Color("gray",128,128,128),
    new Color("navy",0,0,128),
    new Color("silver",192,192,192),
    new Color("black",0,0,0),
    new Color("green",0,128,0),
    new Color("olive",128,128,0),
    new Color("teal",0,128,128),
    new Color("blue",0,0,255),
    new Color("lime",0,255,0),
    new Color("purple",128,0,128),
    new Color("white",255,255,255),
    new Color("fuchsia",255,0,255),
    new Color("maroon",128,0,0),
    new Color("red",255,0,0),
    new Color("yellow",255,255,0),    
    new Color("red",255,0,0),
    new Color("green",0,255,0),
    new Color("blue",0,0,255),
    new Color("yellow",255,255,0), 
    new Color("orange",255,128,0), 
    new Color("pink",255,0,255), 
    new Color("brown",139,69,19), 
    new Color("grey",128,128,128),
    new Color("purple",128,0,128)

];







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