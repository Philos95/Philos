var width=1080;
var height=720;
var r = 40;

let circles = [];


function setup() {
    var cnv = createCanvas(1080, 720);
   /* var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;*/
    /*cnv.position(cnv.position);*/
    cnv.parent('sketch-holder');
    background(0);
    var count =0;

    for (var i = 0;i<=width+100;i=i+r*2){
        for(var j = 0; j<=height+100;j=j+r+5){
            circles[count] = new Circle (i,j,r);
            circles[count].update();
            count++;
        }
    }

    for (var i = r;i<=width+100;i=i+r*2){
        for(var j = r/2; j<=height+100;j=j+r+5){
            circles[count] = new Circle (i,j,r);
            circles[count].update();
            count++;
        }
    }
   

  }


  

function draw() {
    for(var i =0; i<circles.length;i++){
        circles[i].update()
    }
   

 }

function mousePressed(){
    for(var i =0; i<circles.length;i++){
        if(circles[i].overEvent()){
            circles[i].changeActive();
            
        }
    }
}


 function Circle(_x,_y,_r){

    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.color;
    this.active = false;


    this.update = function(){

        if(this.active == false){
            this.color = 160;
        }else if(this.active== true){
            this.color = "rgb(255, 194, 0)";
        }

        this.isHover();

        fill(this.color);
        ellipse(this.x,this.y,this.r);
    }

    this.changeActive = function(){
      
        this.active = !this.active; 
    }

    this.printName = function(){
        console.log(this.x+" "+ this.y);
    }

    this.isHover = function(){
        if(this.overEvent() && this.active==false){
            this.color = 100;
        }
    }

    

    

    // Test to see if mouse is over this spring
    this.overEvent = function() {
        let disX = this.x - mouseX;
        let disY = this.y - mouseY;
        let dis = createVector(disX, disY);
        if (dis.mag() < this.r / 2 ) {
        return true;
        } else {
            return false;
        }
    }



 }