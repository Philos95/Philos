let W =750;
let H= 500;

let R;
let G;
let B;

let StartInsert = false;
let CountColor = true;

let speedSlider;
let speedSpan;
let TotalColors;

let TotRed;
let TotGreen;
let TotBlue;
let TotMagenta;
let TotCyan;
let TotYellow;

function setup(){
    var cnv = createCanvas(W+220,H);
    cnv.parent('sketch-holder');

    speedSlider = select('#speedSlider');
    speedSpan = select('#speed');
    TotalColors = select('#TotalColors');

    TotRed = select('#TotRed');
    TotGreen = select('#TotGreen');
    TotBlue = select('#TotBlue');
    TotMagenta = select('#TotMagenta');
    TotCyan = select('#TotCyan');
    TotYellow = select('#TotYellow');

    frameRate(1);
}



function draw(){
    background(0);
    frameRate(speedSlider.value());
    speedSpan.html(speedSlider.value());

    if(StartInsert){

        $.ajax({
            method: "POST",
            async:  false,
            url: "colorToDB.php?action=insertColor",
            data: { r: R,
                    g: G,
                    b: B,
                    color: rightColor(R,G,B)
                }
        });

        CountColor= true;

        pickColor();
        drawTheStop();
        drawTheColor();

    }else{
        if(CountColor){
            $.ajax({
                method: "POST",
                async:  false,
                url: "colorToDB.php?action=countColors",
                data: { }
            }).done(function( result ) {
                totals = JSON.parse(result);
                TotalColors.html(totals.totale);
                TotRed.html(totals.totRed);
                TotGreen .html(totals.totGreen);
                TotBlue.html(totals.totBlue);
                TotMagenta.html(totals.totMagenta);
                TotCyan.html(totals.totCyan);
                TotYellow.html(totals.totYellow);
            });
            CountColor = false;
        }
        drawTheStart();
    }
}



function drawTheColor(){
    fill(R,G,B);
    rect((W/5)+20, H/5, (W*50)/100, (H*50)/100);
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(32);
    text('Stop Insert data ',((W*1)/5)+120, ((H*4)/5)+25);
}

function drawTheStop(){
    fill(255);
    rect((W*1)/5, (H*4)/5, (W*80)/100, (H*10)/100);
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(32);
    text('Stop Insert data ',((W*1)/5)+120, ((H*4)/5)+25);
}



function drawTheStart(){
    fill(255);
    rect((W/5)+20, H/5, (W*80)/100, (H*2)/3);
    textAlign(LEFT, TOP);
    fill(0);
    textSize(32);
    text('Start Insert Data',(W/5)+40, (H/5)+50);
}


function mouseClicked(){
    if((mouseX>0 &&mouseX<width) && (mouseY>0 &&mouseY<height)){
        StartInsert =!StartInsert;
    }
}





function pickColor(){
    R = random(255);
    G = random(255);
    B = random(255); 
}





function rightColor(r,g,b){
    let actualColor = rightRGB(r,g,b);
    let limit =300;
   
    if((g+b)-r > limit){
        actualColor = "cyan";
    }else if((r+g)-b>limit){
        actualColor =  "yellow";
    }else if((r+b)-g>limit){
        actualColor =  "magenta";

    }
    return actualColor;
}

function rightRGB(r,g,b){
    let colorArray=[];

    colorArray[0]=(r);
    colorArray[1]=(g);
    colorArray[2]=(b);
    let pColor =max(colorArray);
    

    switch(pColor){
         case colorArray[0]:
            return "red";
         case colorArray[1]:
            return "green";
         case colorArray[2]:
            return "blue";
    }
}