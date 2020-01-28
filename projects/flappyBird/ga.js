function resetGame(allBirds){
    
   
    let nextBirds = nextGeneration(allBirds);
    
    pipes = [];
    counter = 0;
  
    return nextBirds;
}




function nextGeneration(oldBirds){
    let bestBird = findBestBird(oldBirds);
    saveBestBird(bestBird);
    let nextBirds=[];

    for( var i =0; i<TOTAL_BIRDS;i++){
        nextBirds[i] = new Bird(bestBird.brain);
    }

    return nextBirds;
}

function findBestBird(oldBirds){
    let bestBird;
    let max = 0;
    for(var i = 0; i<oldBirds.length;i++){
        if (oldBirds[i].score>max){
            bestBird = oldBirds[i];
            max = oldBirds[i].score;
        }
    }
    return bestBird;
}



function saveBestBird(bestBird){
    var birdBrainJSON = JSON.stringify(bestBird.brain);
    $.ajax({
        method: "POST",
        url: "saveBestBird.php?action=saveBird",
        data: { birdBrain : birdBrainJSON}
    });
}