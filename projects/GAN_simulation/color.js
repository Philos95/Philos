class Color{
    constructor(name,r,g,b){
        this.name=name;
        this.r=r;
        this.g=g;
        this.b=b;
    }

 


    getDistance(r,g,b){
       return  Math.abs(r - this.r) + Math.abs(g - this.g) + Math.abs(b -this.b);
    }

    show(x,y,w,h){
        fill(this.r,this.g,this.b);
        rect(x,y,w,h);
        fill(255);
        strokeWeight(1);
        textAlign(CENTER,CENTER);
        textSize(16);
        text(this.name,x+w+50,y+(h/2));

    }

}