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

}