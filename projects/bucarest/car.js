class Car{

    constructor(img,x,y,driver,pos){
        this.img=img;
        this.x = x;
        this.y = y;
        this.driver = driver;
        this.pos = pos;
        this.width=379;
        this.height=650;
        this.rectW=80;
        this.rectH=120;
        this.positions=[
            [this.x+80,this.y+190],
            [this.x+260,this.y+190],
            [this.x+260,this.y+375],
            [this.x+80,this.y+375],
            [this.x+170,this.y+375]
        ];
        this.people = [driver,"","","",""];
        
    }


    show(){
        //imageMode(CENTER);
        image(this.img, this.x, this.y, this.width, this.height);
        for(let i=0;i<=this.pos;i++){
            //this.showPos(i);
            noFill();
            stroke('rgb(0,255,0)');
            strokeWeight(4);
            rect( this.positions[i][0],this.positions[i][1], this.rectW, this.rectH);
            if(this.people[i] instanceof Person){
                this.people[i].show(this.positions[i][0],this.positions[i][1]);
            }
        }

    }



    isClicked(mouseX, mouseY){
        if(mouseX>=this.x && mouseX<=this.x+this.width){
            if(mouseY>=this.y && mouseY<=this.y+this.height){
                for(let p of this.positions){
                    if(mouseX>=p[0] && mouseX<=p[0]+this.rectW){
                        if(mouseY>=p[1] && mouseY<=p[1]+this.rectH){
                           return this.positions.indexOf(p);
                        }
                    }
                }
            }
        }
    }


    insert(pos){

    }
}