class Person{
    constructor(name){
        this.name=name;
    }



    show(x,y){
        //console.log(this.name);
        textSize(32);
        text(this.name, x, y);
    }
}