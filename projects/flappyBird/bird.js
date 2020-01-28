
// Mutation function to be passed into bird.brain
function mutate(x) {
    if (random(1) < 0.1) {
      let offset = randomGaussian() * 0.5;
      let newx = x + offset;
      return newx;
    } else {
      return x;
    }
  }
  
class Bird{
    constructor(brain){
        this.y=height/2;
        this.x=64;
        this.gravity=0.6;
        this.velocity=0;
        this.diameter = 32;

        this.nearestPipe;
    
        this.lift =-12;

        this.score = 0;

        if(brain){
            this.brain = brain.copy();
            this.brain.mutate(mutate);
        }else{
            this.brain = new NeuralNetwork(5,8,2);
        }

    }

    // Create a copy of this bird
    copy() {
        return new Bird(this.brain);
    }

    show(){
        stroke(255);
        fill(255,50);
        ellipse(this.x,this.y,this.diameter,this.diameter);
    }
    up(){
        this.velocity +=this.lift;
    }


    thinkTF(){
        
    }

    think(pipes){     
        let inputs = [];
        
        let NPipe = this.findClosestPipe(pipes);
        if(NPipe!=this.nearestPipe){
            this.nearestPipe = NPipe;
        }
        
        /*  stroke(255, 162, 1);
        line(this.x, this.y, NPipe.x, NPipe.top)
        stroke(255, 254, 1);
        line(this.x, this.y, NPipe.x, Math.abs(NPipe.bottom -height)) */
        if (NPipe!=null){   
           
            inputs[0]= map(NPipe.x,this.x,width,0,1);
            inputs[1]= map(NPipe.top,0,height,0,1);
            inputs[2]= map(height-NPipe.bottom,0,height,0,1);
            inputs[3]= map(this.y,0,height,0,1);
            inputs[4]= map(this.velocity,-5,5,0,1);


           /*  stroke(255,0,0);
            strokeWeight(4);
            point(NPipe.x,NPipe.top+(NPipe.distance/2));
            stroke(0,255,0);
            point(NPipe.x,NPipe.top); 
            point(NPipe.x,height-NPipe.bottom);  */


            let output = this.brain.predict(inputs);

            if(output[1]>output[0]){
                this.up();
            }
        }
    }
    
    offScreen(){
        return(this.y<0 || this.y>height);
    }

    update(){
        this.velocity+=this.gravity;
        this.velocity *=0.9;
        this.y += this.velocity;
        this.score++;
    }

    findClosestPipe(pipes){
        let closest = null;
        let record = Infinity;
        for (let i = 0; i < pipes.length; i++) {
            let diff = pipes[i].x - this.x;
            if (diff > 0 && diff < record) {
                record = diff;
                closest = pipes[i];              
            }
        }
        return closest;
    }
}