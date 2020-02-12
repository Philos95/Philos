class Car{

    constructor(img,x,driver){
        this.img=img;
        this.x = x;
        this.driver = driver;
    }


    show(){
        push();
        translate(width / 2, height / 2);
        rotate(PI / 2);
        imageMode(CENTER);
        image(this.img, 0, this.x, 400, 223);
        pop();
    }
}