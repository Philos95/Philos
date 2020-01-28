class Pipe{

    constructor(){
        this.distance = 125;
        this.top = random(height-this.distance);
        this.bottom = height-this.top-this.distance;
        
        this.x=width;
        this.w =20;
        this.speed=2;

    }
    
    show(){
        fill(255);
        rect(this.x,0,this.w,this.top);
        rect(this.x,this.top +this.distance,this.w,this.bottom);
    }

    update(){
        this.x-= this.speed;
    }

    hits(bird){
        if(bird.y<this.top ||bird.y>height-this.bottom){
            if(bird.x >this.x && bird.x < this.x+this.w){
                fill(255,0,0);
                rect(this.x,0,this.w,this.top);
                rect(this.x,height-this.bottom,this.w,this.bottom);
                return true;
            }
        }
        return false;
    }

    offscreen(){
        if(this.x < -this.w){
            return true;
        }else{
            return false;
        }
    }
}