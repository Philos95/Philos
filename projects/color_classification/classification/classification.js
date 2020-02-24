let W =750;
let H= 500;

let r,g,b;
let index =0;
let arrayEnd=false;

let colorSet=[
    new Color("red",255,0,0),
    new Color("green",0,255,0),
    new Color("blue",0,0,255),

    new Color("yellow",255,255,0),
    new Color("pink",255,0,255),
    new Color("azure",0,255,255),

    new Color("orange",255,128,0),
    new Color("purple",128,0,255),
    new Color("brown",128,64,0),

    new Color("grey",128,128,128),
    new Color("black",0,0,0),
    new Color("white",255,255,255),
];


let colorButtons=[];

function setup(){
    var cnv = createCanvas(W+220,H);
    cnv.parent('sketch-holder');
    pickColor(index);
    let l=50;
    let i=0;
    for(let w=0;w<=3;w++){
        for(let h=0;h<=2;h++){
            
            let wid =((width*((w*2)+1))/8)-40; 
            let hei = (height/2)+ (20*(1+h)+l*h);
            colorButtons.push(new colorButton(wid,hei,l,colorSet[i]));
            i++;
        }
    }
    
}

function draw(){
    background(150);
    printBack();

}



function pickColor(index){
   r=colorArray[index].r;
   g=colorArray[index].g;
   b=colorArray[index].b;
}



function printBack(){
    if(!arrayEnd){

        fill(0);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("R: "+r,(width/2)-300, (height/2)-180);
        text("G: "+g,(width/2)-300, (height/2)-130);
        text("B: "+b,(width/2)-300, (height/2)-80);
        text("Label: "+colorArray[index].name,(width/2)+200, (height/2)-130);

        fill(r,g,b);
        rect((width/2)-100, (height/2)-200, 200, 200, 20 );


    for(let but of colorButtons){
        but.show();
    };



    }else{
        textSize(32);
        //textAlign(CENTER, CENTER);
        fill(0);
        text("Array Finito", (width/2)-300, height/2);
    
    }
}



function mouseClicked() {
    if(isBetween(mouseX,0,width) && isBetween(mouseY,0,height)){
        for(let b of colorButtons){
            if(b.isClicked(mouseX,mouseY)){

                $.ajax({
                    method: "POST",
                    async:  false,
                    url: "setData.php?action=setColor",
                    data: { 
                        R: colorArray[index].r,
                        G: colorArray[index].g,
                        B: colorArray[index].b,
                        label: b.name,
                        old_label:colorArray[index].name
                    }
                }).done(function( result ) {
                    //console.log(b.name);
                   if(result=="1"){
                       console.log("R:"+colorArray[index].r+ " G: "+colorArray[index].g+ " B: "+colorArray[index].b+" oldName: "+colorArray[index].name+ " newName: "+b.name);
                        index++;
                        if(index<colorArray.length){    
                            pickColor(index);
                        }
                        else{
                            arrayEnd=true;
                        }
                   }

                });
                
                
            }
        }
    }
}
