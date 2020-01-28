class Snake{

    constructor(_x,_y){
        this.l =20;
        this.x = _x;
        this.y = _y;
        this.speed = 20;
        this.direction = "up";
        this.positions =[
            [_x,_y],
            [_x,_y+20],
            [_x,_y+40]
        ]
        this.long = 3;
    }

    setDirection(newDirection){
        if((this.direction!="right" && newDirection =="left")||(this.direction!="left" && newDirection =="right")||(this.direction!="up" && newDirection =="down")||(this.direction!="down" && newDirection =="up"))
         {this.direction = newDirection;}
    }

    move(){   

        for(var i =this.long-1;i>0;i--){
            this.positions[i][0]=this.positions[i-1][0];
            this.positions[i][1]=this.positions[i-1][1];
        }

        switch(this.direction){
            case "left":        
                this.positions[0][0] = this.positions[0][0]-this.speed;
            break;
            case "right":
                this.positions[0][0] = this.positions[0][0]+this.speed;
            break;
            case "up":
                this.positions[0][1] = this.positions[0][1]-this.speed;
            break;
            case "down":
                this.positions[0][1] = this.positions[0][1]+this.speed;
            break;
        }

        this.x = this.positions[0][0];      
        this.y = this.positions[0][1];
    }


    display(){
        fill (0,255,0);
        for(var i =0;i<this.long;i++){
            rect(this.positions[i][0],this.positions[i][1],this.l,this.l);
        }
    }

    addPiece(){
        console.log(this.positions);
        this.long++;
        this.positions.push([this.positions[this.long-2][0],this.positions[this.long-2][1]]);
       
    }



 }