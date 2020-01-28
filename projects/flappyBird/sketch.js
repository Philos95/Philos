const TOTAL_BIRDS = 500;

// All birds for any given population
let allBirds = [];
let birds=[];
let savedBirds=[];
let pipes =[];

let genNum=1;
let highScore =0;

let generation;
let currentPopulationSpan;
let speedSlider;
let speedSpan;
let highScoreSpan;
let allTimeHighScoreSpan;
let runBestButton;

let modePhrase;
let statistic = false;

let counter = 1;

let cycles;


function setup(){
    var cnv = createCanvas(600,400);

    // Access the interface elements
    generation = select('#generation');
    currentPopulationSpan = select('#cp');
    speedSlider = select('#speedSlider');
    speedSpan = select('#speed');
    highScoreSpan = select('#hs');
    allTimeHighScoreSpan = select('#ahs');
    modePhrase = select('#modePhrase');
    statsButton = select('#statsButton');
    statsButton.mousePressed(toggleStateStats);

    pipes.push(new Pipe());
    for (var i =0;i<TOTAL_BIRDS;i++){
        birds[i] = new Bird();
    }

   

    cnv.parent('sketch-holder');
}

function draw(){
    background(0); 


    // Should we speed up cycles per frame
    cycles = speedSlider.value();
    generation.html(genNum);
    highScoreSpan.html(counter);
    allTimeHighScoreSpan.html(highScore);
    speedSpan.html(cycles);
    currentPopulationSpan.html(birds.length);



    if(statistic){
        if(counter>= 1000){
            winRestart(true);
        }else{
            game();
        }

    }else{
        game();
       
    }
    

    
}


function game(){
     // How many times to advance the game
     for (let n = 0; n < cycles; n++) {

        for(var i =pipes.length-1 ;i>=0;i--){
            pipes[i].show();
            pipes[i].update();
            for( var j=0; j<birds.length; j++){
                if(pipes[i].hits(birds[j])){
                    //console.log("HIT");
                    savedBirds.push(birds[j]);
                    birds.splice(j,1);
                }
            }
            if(pipes[i].offscreen()){
                pipes.splice(i,1);
            }
        }

        for( var i=0; i<birds.length; i++){
            if(birds[i].offScreen()){
                //console.log("Offscreen");
                savedBirds.push(birds[i]);
                birds.splice(i,1);
            }
        }

        if (birds.length==0){
            allBirds = allBirds.concat(savedBirds);
            birds = resetGame(allBirds);
            genNum++;
            savedBirds =[];
        }

        for (let i =0; i<birds.length; i++){
            birds[i].think(pipes);
            birds[i].update();
            birds[i].show();
        }

        //console.log(frameCount);

        if(counter  % 150==0){
            pipes.push(new Pipe());
        }
        counter++;

        checkHighestScore();
    }
}



function toggleStateStats(){
    if(statistic){
        console.log("BestBird");
        statistic = false;
        statsButton.html("Statistic");
        modePhrase.html("Statistic mode set a limit to 10.000 of score. Save the num of generation that reaches the limit in db");
        winRestart(false);
    }else if(!statistic){
        console.log("Mode Statistic");
        statistic = true;
        statsButton.html("BestBird");
        modePhrase.html("Run the game to get the best bird ever");
        winRestart(false);

    }
}


function winRestart(win){
    if(win){
        console.log("WIN!");
        console.log("Generation: "+genNum);
        let bestBird;
        if(allBirds.length>0){
            bestBird = findBestBird(allBirds);
        }else{
            bestBird = findBestBird(birds);
        }
        saveBestBird(bestBird);

        $.ajax({
            method: "POST",
            url: "saveBestBird.php?action=saveBirdOnDB",
            data: { generation : genNum}
        });
    }

    console.log("New set of birds start now!");
    
    for (var i =0;i<TOTAL_BIRDS;i++){
        birds[i] = new Bird();
    }
    allBirds = [];
    savedBirds=[];
    pipes =[];
    counter = 0
    highScore = 0;
    genNum=1;

}
function checkHighestScore(){
    if (counter>highScore){
        highScore=counter;
    }
}

/* function keyPressed(){
    if(key==' '){
        //console.log("SPace");
        bird.up();
    }
} */