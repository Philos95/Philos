class GAN{
    constructor(generator,discriminator){

        if(generator){
            this.generator = generator;
        }else{
            this.generator = new Generator();
        }

        if(discriminator){
            this.discriminator = discriminator;
        }else{
            this.discriminator = new Discriminator();
        }

        this.batch = 40;
        

    }


    async load(totData){
        await this.discriminator.setData(totData);
    }
    


    async setModel(){
        let model = tf.sequential();
       
        model.add(this.generator.gLayer0);
        model.add(this.generator.gLayer1);
        model.add(this.generator.gLayer2);

        
        
        model.add(this.discriminator.dLayer0);
        model.add(this.discriminator.dLayer1);
        model.add(this.discriminator.dLayer2);
    
        

        


        const sgdOpt = tf.train.sgd(0.025);

        await  model.compile({
            optimizer: sgdOpt,
        /*  loss:'meanSquaredError', */
            loss: tf.losses.softmaxCrossEntropy,
            metrics: ['accuracy']
        })

        this.model = model;



        this.gLayer0=this.model.getLayer(null,0);
        this.gLayer1=this.model.getLayer(null,1);
        this.gLayer2=this.model.getLayer(null,2);
        

        this.dLayer0=this.model.getLayer(null,3);
        this.dLayer1=this.model.getLayer(null,4);
        this.dLayer2=this.model.getLayer(null,5);

    }

    setGenWeights(){
        this.generator.model.layers[0].setWeights(this.model.layers[0].getWeights());
        this.generator.model.layers[1].setWeights(this.model.layers[1].getWeights());
        this.generator.model.layers[2].setWeights(this.model.layers[2].getWeights());


    }


    setDisWeights(){
        this.discriminator.model.layers[0].setWeights(this.model.layers[3].getWeights());
        this.discriminator.model.layers[1].setWeights(this.model.layers[4].getWeights());
        this.discriminator.model.layers[2].setWeights(this.model.layers[5].getWeights());


    }

    getDisWeights(){
        this.model.layers[3].setWeights(this.discriminator.model.layers[0].getWeights());
        this.model.layers[4].setWeights(this.discriminator.model.layers[1].getWeights());
        this.model.layers[5].setWeights(this.discriminator.model.layers[2].getWeights());
    }

    async  train(){
        let response;/* 
        response = await this.discriminator.trainSingleBatch(this.batch); */
        
    
        this.getDisWeights();

        //ALLENO DISCRIMINATOR
        this.gLayer0.trainable = false;
        this.gLayer1.trainable = false;
        this.gLayer2.trainable = false;


        let dxs;
        let dys;

    
        let dlabels =[];

        for (let i=0; i<this.batch;i++){
          
            dlabels.push([0,1])
        }
        
        
        dxs =this.generator.getSeed(this.generator.SEED_SIZE,this.generator.SEED_STD,this.batch);
        dys = tf.tensor2d(dlabels);


        
    
        response = await this.model.trainOnBatch(dxs,dys);
        let dCost = response[0];



        this.gLayer0.trainable = true;
        this.gLayer1.trainable = true;
        this.gLayer2.trainable = true;

        this.setDisWeights();

        //ALLENO GENERATOR

    
        this.dLayer0.trainable = false;
        this.dLayer1.trainable = false;
        this.dLayer2.trainable = false;
    
        
        let gxs;
        let gys;

    
        let labels =[];

        for (let i=0; i<this.batch;i++){
          
            labels.push([1,0])
        }
        
        
        gxs =this.generator.getSeed(this.generator.SEED_SIZE,this.generator.SEED_STD,this.batch);
        gys = tf.tensor2d(labels);


        
    
        response = await this.model.trainOnBatch(gxs,gys);
        let gCost = response[0];
        this.dLayer0.trainable = true;
        this.dLayer1.trainable = true;
        this.dLayer2.trainable = true;

    
        this.setGenWeights();
        
    
       return {dCost,gCost};
    
    }
    
    



    async feedForward(input){
        let results = await this.model.predict(input);
        let response = [results.dataSync()[0],results.dataSync()[1]];
    
        return response;

    }






}



