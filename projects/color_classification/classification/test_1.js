let W =750;
let H= 500;

let r,g,b;

let colorArray=[
    new Color("red",255,0,0),
    new Color("green",0,255,0),
    new Color("blue",0,0,255),

    new Color("yellow",255,255,0),
    new Color("pink",255,0,255),
    new Color("azure",0,255,255),

    new Color("grey",128,128,128),
    new Color("black",0,0,0),
    new Color("white",255,255,255),
    
    new Color("orange",255,128,0),
    new Color("purple",128,0,255),
    new Color("brown",128,64,0)
];
let colors;

async function preload(){
}

function setup(){
    var cnv = createCanvas(W+220,H);
    cnv.parent('sketch-holder');
    pickColor();
    colors=whatColorIs(r,g,b,colorArray);
    //console.log(colors);
}

function pickColor(){
    r = parseInt(random(255));
    g = parseInt(random(255));
    b = parseInt(random(255)); 
}




function whatColorIs(r,g,b,colorList){
    let colors_=[];
    /* colors_.push({
        red:isRed(r,g,b),
        green:isGreen(r,g,b),
        blue:isBlue(r,g,b),
        yellow:isYellow(r,g,b),
        pink:isPink(r,g,b),
        azure:isAzure(r,g,b),
        grey:isGrey(r,g,b),
        black:isBlack(r,g,b),
        white:isWhite(r,g,b),
        orange:isOrange(r,g,b),
        purple:isPurple(r,g,b),
        brown:isBrown(r,g,b)  
    }); */
    colors_.push(isRed(r,g,b));
    colors_.push(isGreen(r,g,b));
    colors_.push(isBlue(r,g,b));
    colors_.push(isYellow(r,g,b));
    colors_.push(isPink(r,g,b));
    colors_.push(isAzure(r,g,b));
    colors_.push(isGrey(r,g,b));
    colors_.push(isBlack(r,g,b));
    colors_.push(isWhite(r,g,b));
    colors_.push(isOrange(r,g,b));
    colors_.push(isPurple(r,g,b));
    colors_.push(isBrown(r,g,b));

    let count=0;

   /* // console.log(colors_[0]);
    for(let c of colors_){
        console.log(c);
        if(!c){
            count ++;
        }
    }
    console.log(count); */


    colors_.forEach(function (color, i) {
        if(color){
            count++;
        }
        console.log(colorArray[i].name+": "+color);
    });

    console.log(count);
    
    
    return colors_
}

function isRed(r,g,b){
    if(isBetween(r,128,255) && isBetween(g,0,50) && isBetween(b,0,50)){
        return true;
    }else{
        return false;
    }
}
function isGreen(r,g,b){
    if(isBetween(r,0,50) && isBetween(g,128,255) && isBetween(b,0,50)){
        return true;
    }else{
        return false;
    }
}

function isBlue(r,g,b){
    if(isBetween(r,0,50) && isBetween(g,0,50) && isBetween(b,128,255)){
        return true;
    }else{
        return false;
    }
}

function isYellow(r,g,b){
    if(isBetween(r,185,255) && isBetween(g,185,255) && isBetween(b,0,128)){
        return true;
    }else{
        return false;
    }
}

function isPink(r,g,b){
    if(isBetween(r,185,255) && isBetween(g,0,128) && isBetween(b,128,255)){
        return true;
    }else{
        return false;
    }
}


function isAzure(r,g,b){
    if(isBetween(r,0,128) && isBetween(g,128,255) && isBetween(b,128,255)){
        return true;
    }else{
        return false;
    }
}

function isBlack(r,g,b){
    if(isBetween(r,0,35) && isBetween(g,0,35) && isBetween(b,0,35)){
        return true;
    }else{
        return false;
    }
}

function isWhite(r,g,b){
    if(isBetween(r,220,255) && isBetween(g,220,255) && isBetween(b,220,255)){
        return true;
    }else{
        return false;
    }
}

function isGrey(r,g,b){
    return inGap([r,g,b],30)
}

function isOrange(r,g,b){
    if(isBetween(r,192,255) && isBetween(g,64,192) && isBetween(b,0,64)){
        return true;
    }else{
        return false;
    }
}

function isPurple(r,g,b){
    if(isBetween(r,64,192) && isBetween(g,0,64) && isBetween(b,192,255)){
        return true;
    }else{
        return false;
    }
}

function isBrown(r,g,b){
    if(isBetween(r,64,192) && isBetween(g,32,96) && isBetween(b,0,64)){
        return true;
    }else{
        return false;
    }
}