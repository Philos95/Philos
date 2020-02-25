const TOT_DATA=10;

let W =750;
let H= 500;



let result;

let startGame=false;
let isReal=true;

let discriminator = new Discriminator();;



async function setup(){

    var cnv = createCanvas(W+220,H);
    cnv.parent('sketch-holder');

    frameRate(1);

    await discriminator.setData(TOT_DATA);
    startGame = true;


    

}



async function draw(){
    background(0);
    if(startGame){
        for(let i =0;i<10000;i++){
            if(isReal){
                await discriminator.train();
                
            }else{
                let fakeColor = getRandomColorData();
                let fakeArray = [parseFloat(fakeColor.r / 255), parseFloat(fakeColor.g / 255), parseFloat(fakeColor.b / 255), labelToArray(fakeColor.name)];
                let fakeArrayFlat =[];
                fakeArrayFlat.push(fakeArray.flat()); 
                await discriminator.train(fakeArrayFlat);
            }
            isReal = !isReal;
        }
    
        console.log(discriminator.discriminate(getRandomColorData()));
    
       

    }

    

}





function getRandomColorData(){
    let color_name  = labelList[Math.floor(Math.random()*labelList.length)];
    return new Color(color_name, parseInt(random(255)), parseInt(random(255)), parseInt(random(255)));
}


