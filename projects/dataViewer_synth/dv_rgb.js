const labelList = [
    "red",
    "green",
    "blue",
    "yellow",
    "pink", 
    "azure",
    "orange",
    "purple",
    "brown",
    "grey",
    "black",
    "white"  
];
let Red_data=[];
let Green_data=[];
let Blue_data=[];

let Red_data_synth=[];
let Green_data_synth=[];
let Blue_data_synth=[];

W = 720;
H = 480;
let myChart;
let getTheData = false;

let selected_Chart;

let rgbLabel;

async function setup(){
    var cnv = createCanvas(W+50,H);
    cnv.parent('sketch-holder');


    rgbLabel =  select("#rgbLabel");
    let DBdata=[];
    for(let l of labelList){
         DBdata=await getData("R",l,100,"real");
         for( let d of DBdata){
            Red_data.push({
                color :l,
                val:parseInt(d.R)
            });
        }

        DBdata=await getData("G",l,100,"real");
         for( let d of DBdata){
            Green_data.push({
                color :l,
                val:parseInt(d.G)
            });
        }

        DBdata=await getData("B",l,100,"real");
         for( let d of DBdata){
            Blue_data.push({
                color :l,
                val:parseInt(d.B)
            });
        }


        DBdata=await getData("R",l,100,"synth");
         for( let d of DBdata){
            Red_data_synth.push({
                color :l,
                val:parseInt(d.R)
            });
        }

        DBdata=await getData("G",l,100,"synth");
         for( let d of DBdata){
            Green_data_synth.push({
                color :l,
                val:parseInt(d.G)
            });
        }

        DBdata=await getData("B",l,100,"synth");
         for( let d of DBdata){
            Blue_data_synth.push({
                color :l,
                val:parseInt(d.B)
            });
        }
    }
   
    

    console.log(Red_data);


    R_Chart = new Chart(labelList,10,Red_data,Red_data_synth,W,H,50,50);
    G_Chart = new Chart(labelList,10,Green_data,Green_data_synth,W,H,50,50);
    B_Chart = new Chart(labelList,10,Blue_data,Blue_data_synth,W,H,50,50);
    
    selected_Chart = R_Chart;
    noLoop();
    
    background(250);
    getTheData = true;
    

}

function draw(){
    background(250);
    if(getTheData){
        selected_Chart.show();
    }
}

function mousePressed() {
    if(selected_Chart == R_Chart){
        selected_Chart = G_Chart;
        rgbLabel.html("Green");
    }else if(selected_Chart == G_Chart){
        selected_Chart = B_Chart;
        rgbLabel.html("Blue");
    }else if(selected_Chart == B_Chart){
        selected_Chart = R_Chart;
        rgbLabel.html("Red");
    }
    redraw();
  }



function getData(rgb,color,limit,type){
    let rgb_data=[];

    $.ajax({
        method: "POST",
        async:  false,
        url: "colorFromDB.php?action=rgbValue",
        data:{
            rgb:rgb,
            color:color,
            limit:limit,
            db:type
        }
    }).done(function( result ) {
        dataJSON = JSON.parse(result);
        rgb_data =dataJSON;
    });
    return rgb_data;

}


async function doChart(){
   
}


