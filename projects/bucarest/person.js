class Person{
    constructor(/* name, */img){
        //this.name=name;
        this.img=img;
    }



    show(x,y){
        //console.log(this.name);
        //console.log(this.img);
        //imageMode(CENTER);
        image(this.img, x, y, 80, 120);
        
        /* stroke(1);
        strokeWeight(1);
        fill(1);
        textSize(32);
        text(this.name, x, y); */
    }
}