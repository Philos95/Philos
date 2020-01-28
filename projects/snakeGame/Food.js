class Food{
    constructor(){
        this.l = 20;
        this.x = ceil(random(20,width-20)/20)*20;
        this.y = ceil(random(20,height-20)/20)*20;
        
    }

    regen(){
        this.x = ceil(random(20,width-20)/20)*20;
        this.y = ceil(random(20,height-20)/20)*20;
    }

    display(){
        fill(255,0,0);
        rect(this.x,this.y,this.l,this.l);
    }
}