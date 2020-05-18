class Chart{
    constructor(labels,y_steps,data_real,data_synth,W,H,W_off,H_off){
        this.labels = labels;
        this.y_steps = y_steps;
        this.data_real = data_real;
        this.data_synth = data_synth;
        this.W = W;
        this.H = H;
        this.W_off = W_off;
        this.H_off = H_off;
        this.maxItems = 255;
        this.X_line_length = this.W-this.W_off; 
        this.Y_line_length = this.H-this.H_off;
    }



    show(){
        //THE Lines
        strokeWeight(1);
        stroke(0);
        line(this.W_off,0,this.W_off,this.H-this.H_off);
        line(this.W_off,this.H-this.H_off,this.W,this.H-this.H_off);


        //Linee verticali    
        for(let i = 1; i<=this.labels.length;i++){
            strokeWeight(1);
            stroke(0);
            line(this.W_off+(this.X_line_length*(i/this.labels.length)),this.H-(this.H_off-(this.H_off/8)),this.W_off+(this.X_line_length*(i/this.labels.length)),this.H-(this.H_off+(this.H_off/8)));
        }

        //labels
        for(let i = 1; i<=this.labels.length;i++){
            strokeWeight(4);
            stroke(255,0,0);
            //point(this.W_off+(X_line_length*(i/this.labels.length)) - ((X_line_length/this.labels.length)/2),this.H-(this.H_off-(this.H_off/8)));
            strokeWeight(0.5);
            stroke(0);
            textSize(10);
            textAlign(CENTER);
            text(this.labels[i-1], this.W_off+(this.X_line_length*(i/this.labels.length)) - ((this.X_line_length/this.labels.length)/2),this.H-(this.H_off-(this.H_off/6)));
        }

    
    
        for( let i = 0; i<this.y_steps;i++){
            strokeWeight(1);
            stroke(0);
            line(this.W_off-(this.W_off/8),(this.Y_line_length*(i/this.y_steps)),this.W_off+(this.W_off/8),(this.Y_line_length*(i/this.y_steps)));

        }

        for(let i =1;i<=this.y_steps;i++){
            strokeWeight(0.5);
            stroke(0);
            textSize(10);
            textAlign(CENTER);
            let step = ceil(this.maxItems*(i/this.y_steps));
            text(step,this.W_off/2,this.getYFromValue(step)+8);
            //console.log(step);
        }


        strokeWeight(4);
        stroke(255,0,0);
        for (let item of this.data_real){
            this.setColorToShow("real");
            point(this.getXFromLabel(item.color)-5,this.getYFromValue(item.val))
        }

        for (let item of this.data_synth){
            this.setColorToShow("synth");
            point(this.getXFromLabel(item.color)+5,this.getYFromValue(item.val))
        }
        stroke(255,0,0);
        /* point(this.getXFromLabel("red",X_line_length),this.getYFromValue(255,Y_line_length));
        point(this.getXFromLabel("red",X_line_length),this.getYFromValue(64,Y_line_length));
        point(this.getXFromLabel("red",X_line_length),this.getYFromValue(128,Y_line_length));
        point(this.getXFromLabel("red",X_line_length),this.getYFromValue(0,Y_line_length));
        point(this.getXFromLabel("red",X_line_length),this.getYFromValue(192,Y_line_length));
        point(this.getXFromLabel("pink",X_line_length),this.H/2);
        point(this.getXFromLabel("blue",X_line_length),this.H/2);
        point(this.getXFromLabel("white",X_line_length),this.H/2);
        */
       
       //point(this.getXFromLabel("red"),this.getYFromValue(64));

    }


    
    setColorToShow(d_type){

        switch (d_type) {
            case "synth":
                stroke(234,67,53);
                break;
        
            case "real":
                stroke(66,133,244);
                break;
        }
    
    }
    getXFromLabel(label){
        let i = this.labels.indexOf(label)+1;      
        return (this.W_off+(this.X_line_length*(i/this.labels.length)) - ((this.X_line_length/this.labels.length)/2));
    }

    getYFromValue(value){
       return (this.H-this.H_off)-(this.Y_line_length * value/this.maxItems);

    }
   
}