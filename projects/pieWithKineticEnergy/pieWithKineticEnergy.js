var space = 20;

var speedUp =false;

var M2= 1;


let b1 = new Box(1,0,60+space,20);
let b2 = new Box( Math.pow(100,M2) ,-1,80+space,40);
let cc = new ColliderController(b1,b2,space);


function setup(){
    var cnv = createCanvas(1200, 400);
    
    cnv.parent('sketch-holder');
    background(0);
}

function draw(){
  background(0);
  strokeWeight(2);
  stroke(255);
  line (space,400,space,-10);
  for(var i =0; i<height/space; i++){
    line(0,space*(i+1),space,space*i);
  }
  if (speedUp){
    for(var j=0;j<b2.m;j++){
        b1.show();
        b1.move();
        b2.show();
        b2.move();
        cc.checkCollision();
    } 
  }
    else{
        b1.show();
        b1.move();
        b2.show();
        b2.move();
        cc.checkCollision();
    
    }
  
}


function mousePressed(){
  speedUp = true;

}
function mouseReleased(){
  speedUp = false;
}





function Box(_m,_v, _x, _size){
    
      this.m =_m;
      this.x=_x;
      this.v=_v;
      this.size=_size;
    
    
    this.move = function(){
      this.x = this.x+ this.v;
     
    }
    
    this.show = function()
    {
     stroke(255);
     strokeWeight(1);
     rect(this.x,height-this.size,this.size,this.size);
    }
  
  }



  function ColliderController (_b1, _b2,_wall){
    this.b1 = _b1;
    this.b2 = _b2;
    this.wall = _wall;
    this.count=0;
    this.vi1 = 0;
    

    this.checkCollision= function(){
      if(this.b1.x+this.b1.size >= this.b2.x)
      {
        this.count++;
        this.b1.x =this.b2.x-this.b1.size;
        if(this.b2.x < this.b1.size+this.wall){
            this.b2.x = this.b1.size + this.wall;
        }
        this.vi1=this.b1.v; 
        this.b1.v=((this.b1.m-this.b1.m)/(this.b1.m+this.b1.m)*this.b1.v) + ((2*this.b1.m)/(this.b1.m+this.b1.m) *this.b1.v);
        this.b1.v= ((this.b1.m-this.b1.m)/(this.b1.m+this.b1.m) *this.b1.v) + ((2*this.b1.m)/(this.b1.m+this.b1.m)* this.vi1);
        
        console.log(this.count);
      }
      this.wallCollision(this.b1);
      this.wallCollision(this.b2);
      
     
    }
    
   
    
    this.wallCollision= function(b){
    
        if(b.x <=this.wall){
            this.count++;
            b.x =this.wall;
            b.v=-b.v;
            console.log(this.count);
        }
        
    }
  
  
  }