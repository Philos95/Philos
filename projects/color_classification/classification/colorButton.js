class colorButton{
    constructor(x,y,l,color){
        this.x=x+50;
        this.y=y;
        this.r=color.r;
        this.g=color.g;
        this.b=color.b;
        this.name=color.name;
        this.l=l;
        this.round=20;
    }


    show(){
        fill(0);
        textSize(20);
        textAlign(CENTER, CENTER);
        text(this.name,this.x-50, this.y+20);

        fill(this.r,this.g,this.b);
        rect(this.x,this.y,this.l,this.l,this.round);
    }


    isClicked(mouseX,mousY){
        if(isBetween(mouseX,this.x,this.x+this.l)&& isBetween(mousY,this.y,this.y+this.l)){
            return true;
        }
    }
}